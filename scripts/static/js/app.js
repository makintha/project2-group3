console.log("div")

d3.json("/api/v1.0/tot_attendance").then(data =>{
    console.log(data)
})