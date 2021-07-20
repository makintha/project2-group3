from flask import Flask, jsonify, render_template, redirect, url_for
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import numpy as np
import os
import json

from sqlalchemy.sql.expression import true


#################################################
# Database Setup
#################################################
path = os.path.dirname(os.path.abspath(__file__))
# print(path)
print(os.getcwd())

engine = create_engine(f"sqlite:///{path}/static/newyork.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# print(Base.classes.keys())
# Save reference to the table
Counties = Base.classes.county_data
Attn = Base.classes.attendance_data
Yr = Base.classes.yearly_attendance_data
################################################
# Flask Setup
################################################
app = Flask(__name__)


# ################################################
# # Flask Routes
# ################################################

# @app.route("/")
# def welcome():
#     return (
#         f"Welcome to the Homepage of API!<br/>"
#         f"Available Routes:<br/>"
#         f" <br/>"
#         f"/api/v1.0/<br/>"
#         f"/api/v1.0/yearly_attendance/<br/>"
#         f"/api/v1.0/GeoJSON/<br/>"    
#     )
# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/interactive_county_map")
def interactive():
    # Return template and data
    return render_template("interactive_county_map.html")

@app.route("/2019_dynamic_scatter_plot")
def scatter():
    # Return template and data
    return render_template("2019_dynamic_scatter_plot.html")


@app.route("/api/v1.0/")
def create_API():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list county data"""
    # Query all county data
    results = session.query(Counties.County, Counties.Attendance, Counties.Income, Counties.Population,).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_precipitation
    all_data = []
    for county, attn, inc, pop  in results:
        county_dict = {}
        county_dict["county"] = county
        county_dict['attendance'] = attn
        county_dict['income'] = inc
        county_dict['population'] = pop 
        all_data.append(county_dict)

    return jsonify(all_data)

# Yearly Attendance
@app.route("/api/v1.0/yearly_attendance")
def yr_attendance():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list county data"""
    # Query all county data
    results = session.query(Yr.Year, Yr.Facility, Yr.Attendance).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_precipitation
    all_data = []
    for yr, fac, attn in results:
        county_dict = {}
        county_dict['attendance'] = attn
        county_dict['facility'] = fac
        county_dict['year'] = yr 
        all_data.append(county_dict)

    return jsonify(all_data)


# GEOJSON
@app.route("/api/v1.0/GeoJSON")
def geoJSON():
    with open(f'Compile/static/data/New York State us-county-boundaries_GEOJSON.json') as f:
        data = json.load(f)

    # Return template and data
    return data

if __name__ == "__main__":
    app.run(debug=True)






# Output: {'name': 'Bob', 'languages': ['English', 'Fench']}
# print(data)