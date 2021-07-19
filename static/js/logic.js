// Creating map object
var myMap = L.map("map", {
  center: [42.8, -75],
  zoom: 7
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Set link to get the geojson data of county boundaries
var boundaryLink = "static/data/New York State us-county-boundaries_GEOJSON.json";

// Set link to get state park attendance by county
var attendanceLink = "static/data/cleaned_county_attendance_income_pop.csv";

//  Create color function
function getColor(csvData) {  
  switch (true) {
    case (csvData.Attendance > 5000000):    
      return '#67000d';
    case (csvData.Attendance > 2000000):    
      return '#a50f15';
    case  (csvData.Attendance > 1000000):    
      return '#cb181d';
    case (csvData.Attendance > 500000):    
      return '#ef3b2c';
    case (csvData.Attendance > 100000):    
      return '#fb6a4a';
    case (csvData.Attendance > 50000):    
      return '#fc9272';
    case (csvData.Attendance > 1):                       
      return '#fcbba1';
    case (csvData.Attendance < 1):                       
      return '#74c476';
  }
}

// Create empty array to hold data
attendanceCounty = []

// Loop through .csv and pull out county and attendance data and assign color using the color function
d3.csv(attendanceLink).then(function(data) {

  for (var i = 0; i < data.length; i++) {
  
    county = data[i].County
    attendance = data[i].Attendance
    color = getColor(data[i])   

    attendanceCounty.push({"county":county, "attendance":attendance, "color":color});
}
})

// Log the array with new data
console.log(attendanceCounty);


// When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
function highlightFeature(event) {
  layer = event.target;
  layer.setStyle({
    fillOpacity: 0.6,
    color: '#ffffff',
    dashArray: ''
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

// When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
function resethighlightFeature(event) {
  layer = event.target;
  layer.setStyle({
    fillOpacity: 0.8,
    dashArray: '3'
  });
}

// When a feature (neighborhood) is clicked, it is enlarged to fit the screen
function clickFeature(event) {
  myMap.fitBounds(event.target.getBounds())
}

// Grabbing the GeoJSON data..
d3.json(boundaryLink).then(function(data) {
  
  attendanceCounty.forEach(county => {
    data.features.forEach(boundary => {
      if (boundary.properties.name == county.county) {
        boundary.properties.color = county.color,
        boundary.properties.attendance = county.attendance
      }
    })    
  })
  
  console.log(data.features)

  L.geoJson(data, {  

    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        fillColor:  feature.properties.color,      
        fillOpacity: 0.8,
        dashArray: '3',
        weight: 0.8
      };             
    },
   
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        mouseover: highlightFeature,
        mouseout: resethighlightFeature,
        click: clickFeature
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup(`<h2>${feature.properties.name}</h2><hr><h3>Attendance: ${feature.properties.attendance}</h3>`)
    }
  }).addTo(myMap);
});

// Create Legend
// ===========================
// Create marker legend and add to map
var legend = L.control({position: "bottomright"});
    
legend.onAdd = function() {  
    var div = L.DomUtil.create('div', 'legend');
    labels = ['<strong>Number of<br>State Parks</strong>'],
    categories = ['0', '1 - 50000', '50001 - 100000', '100001 - 500000', '500001 - 1000000',  '1000001 - 2000000', '2000001 - 5000000', '> 5000000'],
    colors = ["#74c476", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"]

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML += labels[0]  + '<hr>'
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML += '<i class="leg" style="background:' + colors[i] + '"></i>' + categories[i] + "<br>";
        }
    return div;
    };
};
legend.addTo(myMap);

