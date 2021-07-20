//initialise the data
d3.json("/api/v1.0/yearly_attendance").then( function(data) {

    years = [];
        for (var y = 2015; y < 2021; y++) {
            years.push(y)
          }
        
    //multiple lists for each year
    facil2015 = []; att2015 = [];
    facil2016 = []; att2016 = [];
    facil2017 = []; att2017 = [];
    facil2018 = []; att2018 = [];
    facil2019 = []; att2019 = [];
    facil2020 = []; att2020 = [];
    
    //muiltiple to append to list
        data.forEach(function (facil){
            if(facil.Year == 2015 && facil.attendance > 1000000){
                facil2015.push(facil.facility);
                att2015.push(facil.attendance);
            } 
    
        })
    
        data.forEach(function (facil){
            if(facil.Year == 2016 && facil.attendance > 1000000){
                facil2016.push(facil.facility);
                att2016.push(facil.attendance);
            } 
    
        })
        data.forEach(function (facil){
            if(facil.Year == 2017 && facil.attendance > 1000000){
                facil2017.push(facil.facility);
                att2017.push(facil.attendance);
            } 
    
        })
        data.forEach(function (facil){
            if(facil.Year == 2018 && facil.attendance > 1000000){
                facil2018.push(facil.facility);
                att2018.push(facil.attendance);
            } 
    
        })
        data.forEach(function (facil){
            if(facil.Year == 2019 && facil.attendance > 1000000){
                facil2019.push(facil.facility);
                att2019.push(facil.attendance);
            } 
    
        })
    
        data.forEach(function (facil){
            if(facil.Year == 2020 && facil.attendance > 1000000){
                facil2020.push(facil.facility);
                att2020.push(facil.attendance);
            } 
    
        })
       
var data = [{
    values: att2015,
    labels: facil2015,
    text: '2015',
    textposition: 'inside',
    domain: {row: 0, column: 0},
    name: '2015 attendance',
    hoverinfo:'label+value',
    hole: .3,
    type: 'pie'
  },{
    values: att2016,
    labels: facil2016,
    text: '2016',
    textposition: 'inside',
    domain: {row: 0, column: 1},
    name: '2016 attendance',
    hoverinfo: 'label+value',
    hole: .3,
    type: 'pie'
  },{
    values: att2017,
    labels: facil2017,
    text: '2017',
    textposition: 'inside',
    domain: {row: 1, column: 0},
    name: '2017 attendance',
    hoverinfo: 'label+value',
    hole: .3,
    type: 'pie'
  },{
    values: att2018,
    labels: facil2018,
    text: '2018',
    textposition: 'inside',
    domain: {row: 1, column: 1},
    name: '2018 attendance',
    hoverinfo: 'label+value',
    hole: .3,
    type: 'pie'
  },{
    values: att2019,
    labels: facil2019,
    text: '2019',
    textposition: 'inside',
    domain: {row: 2, column: 0},
    name: '2019 attendance',
    hoverinfo: 'label+value',
    hole: .3,
    type: 'pie'
  },{
    values: att2020,
    labels: facil2020,
    text: '2020',
    textposition: 'inside',
    domain: {row: 2, column: 1},
    name: '2020 attendance',
    hoverinfo: 'label+value',
    hole: .3,
    type: 'pie'
  }];
  
  var layout = {
    title: 'State Parks with More Than 1 Million Visits',
    annotations: [
      {
        font: {
          size: 15
        },
        showarrow: false,
        text: '2020',
        x: 0.79,
        y: 0.13
      },
      {
        font: {
          size: 15
        },
        showarrow: false,
        text: '2018',
        x: 0.79,
        y: 0.5
      },
      {
        font: {
          size: 15
        },
        showarrow: false,
        text: '2016',
        x: 0.79,
        y: 0.86
      },
      {
        font: {
          size: 15
        },
        showarrow: false,
        text: '2017',
        x: 0.21,
        y: 0.5
      },
      {
        font: {
          size: 15
        },
        showarrow: false,
        text: '2015',
        x: 0.21,
        y: 0.86
      },
      {
        font: {
          size: 15
        },
        showarrow: false,
        text: '2019',
        x: 0.21,
        y: 0.13
      },
    ],
    height: 600,
    width: 960,
    margin: {
        l: -30,
        r: -10,
        b: 0,
        t: 0,
        pad: 0
      },
    showlegend: false,
    tracetoggle: false,
    grid: {rows: 3, columns: 2}
  };
  
  Plotly.newPlot('donuts', data, layout);



});