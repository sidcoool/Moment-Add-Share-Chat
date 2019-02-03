$(()=>{
    $.get("private/mom", (data)=>{
        moments = data
        console.log(data)
        for(let moment of data){
            console.log(moment.date)
            $("#mom-container").append(
                $("<div>")
                .attr("class","border-dark p-4 my-2")
                .css("border-radius","50px")
                .css("background-color","bisque")
                .css("border-style","dotted")
                .append(
                    $("<div>")
                    .attr("class","row")
                    .append(
                    $("<div>")
                    .attr("class","col-6")
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
                .append(
                    $("<div>")
                    .attr("class","col-6")
                    .append(
                        $("<img>")
                        .attr("src",`../uploads/${moment.img}`)
                        .attr("class","img-thumbnail")
                    )
                )
                )
            )}
    })
})