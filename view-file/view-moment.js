$(()=>{
    $.get("/mom-get", (data)=>{
        moments = data
        console.log(data)
        for(let moment of data){
            console.log(moment.date)
            $("#mom-container").append(
                $("<div>")
                .attr("class","border-secondary bg-warning p-4 my-2")
                .css("border-radius","50px")
                .append(
                    $("<h5>")
                    .attr("class","font-weight-bold")
                    .text("Date: " + moment.date)
                )
                .append(
                    $("<h5>")
                    .attr("class","font-weight-bold")
                    .text("Place: " + moment.place)
                )
                .append(
                    $("<h5>")
                    .attr("class","font-weight-bold")
                    .text("Moment: " + moment.mom_text)
                )
                )
        }
    })
})