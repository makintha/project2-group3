from flask import Flask, jsonify, render_template, redirect, url_for
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import numpy as np
import os


#################################################
# Database Setup
#################################################
path = os.path.dirname(os.path.abspath(__file__))
# print(path)
# print(os.getcwd())

engine = create_engine(f"sqlite:///{path}/newyork.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys())
# Save reference to the table
Counties = Base.classes.county_data
Attn = Base.classes.attendance_data
################################################
# Flask Setup
################################################
app = Flask(__name__)


# ################################################
# # Flask Routes
# ################################################

@app.route("/")
def welcome():
    return (
        f"Welcome to the Homepage of API!<br/>"
        f"Available Routes:<br/>"
        f" <br/>"
        f"/api/v1.0/"
        f" <br/>"
        f"/api/v1.0/year=<year><br/>"
        f"/api/v1.0/percounty/year=<year><br/>"
        f"/api/v1.0/attendance"
    )
# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

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

@app.route("/api/v1.0/year=<year>")
def attendance_yr(year):

    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    sel = [Attn.County, Attn.Facility, Attn.Attendance]
    results = session.query(*sel).filter(Attn.Year == year).all()

    print(results)

    session.close()
    all_data = []
    for county, fac, attn  in results:
        county_dict = {}
        county_dict["county"] = county
        county_dict['facility'] = fac
        county_dict['attendance'] = attn
        all_data.append(county_dict)

    return jsonify(all_data)

# summarize attendance per county
@app.route("/api/v1.0/percounty/year=<year>")
def sum_county_yr(year):

    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Attn.County, func.sum(Attn.Attendance))\
        .filter(Attn.Year == year).group_by(Attn.County).all()

    print(results)

    session.close()
    all_data = []
    for county, attn  in results:
        county_dict = {}
        county_dict["county"] = county
        county_dict['attendance'] = attn
        all_data.append(county_dict)

    print(all_data)
    return jsonify(all_data)

# Attendance full_list
@app.route("/api/v1.0/attendance")
def attendance():

    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Attn.Facility, func.count(Attn.Attendance))\
        .group_by(Attn.Facility).all()

    # print(results)
    session.close()
    facilities = []
    for fac, count_no in results:
        facilities.append(fac)
    # facilities.append(results)
    # print(facilities, len(facilities))
    all_data = []
    for facility in facilities:
        results = session.query(Attn.County, Attn.Attendance, Attn.Year)\
        .filter(Attn.Facility == facility).all()
        session.close()
        features = {}
        features['name'] = facility
        features['year'] = []
        features['attendance'] = []
        for county, attn, yr in results:
            features['county'] = county
            features['year'].append(yr)
            features['attendance'].append(attn)
        all_data.append(features)

    return jsonify(all_data)



    # all_data=[]
    # for fac, attn in results:
    #     # print(fac)
    #     Facilities={}
    #     Facilities['facility'] = fac
    #     all_data.append(Facilities)      

    # print(all_data)




if __name__ == "__main__":
    app.run(debug=True)
