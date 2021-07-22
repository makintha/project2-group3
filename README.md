<h2>Project Title: New York New York</h2>

<h4><b>Introduction</b></h4>
<u>New York is well known for its City and Iconic Skyscrapers. Do you know that within New York state, there are plenty of parks that are worth visiting? Yes, in this project, our team will be looking at all the State Parks within each county in New York State.
</u>
Our Goal is to create a Dashboard that contains the State Map of New York, boundaries of each county,  containing these layers - Pinpoints of each state park, heatmap of each county’s population, their median income and each of the state park’s attendance. We will also be including an interactive bar chart showing the State Park’s attendance of each year. 

<h4><b>Scope of Data</b></h4>
Limited to New York State State Park’s and Dataset time to set within 2019.
State Park attendance data to span from 2003 to 2020

<h4><b>Questions to Answer</b></h4>

- Which State Parks in New York State is the most popular?

- Which County is the Popular Park Located?

- Attendance of Park Vs. County’s Population and Median Income

- Does a State Park stay at No.1 in terms of Attendance?

<h4><b>Visualisation</b></h4>
To Create a Dashboard to show all the different State Park Facilities for the State of New York in the USA.
To show the population of each County in the state and their income level (Median) (Choropleth)
A heatmap of the park data
Chart of the yearly attendance of each park (Interactive)

<h4><b>Demo of Webpage</b></h4>
Main Landing Page - (About the Project, including links to the data visuals)

![main](https://user-images.githubusercontent.com/78995824/126478707-fbbcbe6e-9221-49bc-841c-b04a0e32f2e0.JPG)


<h4><b>Interactive Map</h4></b>

![mapdemo](https://user-images.githubusercontent.com/78995824/126479662-9b12d0e5-63ac-43a1-9fb6-98a238ba94ad.JPG)

<h4><b>Dynamic Bar Chart to show State Parks with attendance of more than 300 thousand</h4></b>

![bardemo](https://user-images.githubusercontent.com/78995824/126479697-579adfeb-91a1-4e5c-98c7-13dcb2fd4803.JPG)

<h4><b>Interactive Scatter Plot to identify any relationship between Attendance , Income and a County's Population</h4></b>

![scatterdemo](https://user-images.githubusercontent.com/78995824/126479704-74627185-a24d-47f8-be58-0adb97c1b1c2.JPG)

<h4><b>Donut Charts to show State Parks with attendance of more than 1 Million</h4></b>

![donutdemo](https://user-images.githubusercontent.com/78995824/126479723-07452500-294b-412c-bb26-0699f0de9ae8.JPG)

<h4><b>A glimps of codes for the data visualisations</h4></b>

Utilised Geojson to plot out each County of the New York State
![maps](https://user-images.githubusercontent.com/78995824/126479807-c1c495d2-9288-4cc6-a611-dabb0cd37dbb.JPG)

Utilised ChartJS library to create the Bar Charts
![yearlybar](https://user-images.githubusercontent.com/78995824/126479935-2115e605-0a3e-4c4c-ac3c-a12827ab0d4d.JPG)

Function to update the tool tip when another X Axis is selected
![scatter](https://user-images.githubusercontent.com/78995824/126480098-df153174-c59b-4917-a572-e36760898a7d.JPG)

Used lists to capture filtered data and utilised Plotly to plot the Donut charts 
![donut](https://user-images.githubusercontent.com/78995824/126480668-a16d2901-17ed-4a65-aef6-0812b0b7de80.JPG)


<h4><b>Links</b></h4>

[State Park Site](http://nysparks.com/parks/142/details.aspx)

[New York State Map](https://www.google.com/maps/search/new+york+state/@42.5326765,-75.8025206,8z) 

[2019 New York State Population](https://www.census.gov/search-results.html?q=population+new+york+state&page=1&stateGeo=none&searchtype=web&cssp=SERP&_charset_=UTF-8)

State Park Attendance (We picked 2019 to fit with 2019 Population data)

https://data.ny.gov/Recreation/State-Park-Annual-Attendance-Figures-by-Facility-B/8f3n-xj78/data

https://data.ny.gov/

https://cugir.library.cornell.edu/catalog/cugir-007865

[GeoJson Polygons for each county for New York State](http://gis.ny.gov/civil-boundaries/)

[US County Boundaries](https://public.opendatasoft.com/explore/dataset/us-county-boundaries/export/?disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name&sort=stusab)

[New York State County Boundaries (GeoJSON format)](https://public.opendatasoft.com/explore/dataset/us-county-boundaries/export/?disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name&refine.stusab=NY)

 
<h4><b>Link to Deployed Website</h4></b>
https://newyork-newyork.herokuapp.com/
