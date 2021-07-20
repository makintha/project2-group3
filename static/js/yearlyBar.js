//initialise data
d3.json("/api/v1.0/yearly_attendance").then( function(data) {

    var yeardata = document.getElementById('yeardata');

    document.getElementById('yeardata').addEventListener('change', function() {
        yeardata = this.value;
        resetCanvas();
        makeChart(yeardata) 
    }); 
    
    //to clear the canvas when new year data is selected from drop down
    function resetCanvas() {
        document.getElementById("chartBox").innerHTML = '<canvas id="chart"></canvas>';
    }


    //making chart utilising chartjs
    function makeChart(yeardata){
    var facilities = [];
    var attendance = [];

    data.forEach(function (facil){
        if(facil.year == yeardata && facil.attendance > 300000){
            facilities.push(facil.facility);
            attendance.push(facil.attendance);
     
        } 

    })

    var chart = new Chart ('chart', {
    type: 'bar',
    data: {
        labels: facilities,
        datasets: [{
            label:`${yeardata} Visits`, 
            data: attendance,
            backgroundColor: [
                'rgba(246, 238, 171, 0.3)',
                'rgba(201, 221, 148, 0.3)',
                'rgba(157, 207, 148, 0.3)',
                'rgba(126, 199, 150, 0.3)',
                'rgba(94, 189, 150, 0.3)',
                'rgba(17, 167, 151, 0.3)'
            ],
            borderColor: [
                'rgba(246, 238, 171, 1)',
                'rgba(201, 221, 148, 1)',
                'rgba(157, 207, 148, 1)',
                'rgba(126, 199, 150, 1)',
                'rgba(94, 189, 150, 1)',
                'rgba(17, 167, 151, 1)'
            ],
            borderWidth: 3
        }],
        options: {
            scales: {
                y: {
                    type: 'linear',
                    min: 300000,
                    max: 1000000,
                }
            }
        }
 
    }
  
    });
}
//initialise chart
makeChart(2003);

});

