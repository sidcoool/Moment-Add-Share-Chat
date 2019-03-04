function shareMomFun(data){
    $("#chat-msg").append(
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
                .text("Date: " +data.date )
            ).append($("<br>"))
            .append(
                $("<h5>")
                .attr("class","font-weight-bold")
                .text("Place: " + data.place)
            ).append($("<br>"))
            .append(
                $("<h5>")
                .attr("class","font-weight-bold")
                .text("Moment: " + data.mom)
            ).append($("<br>"))
        )
        .append(
            $("<div>")
            .attr("class","col-6")
            .append(
                $("<img>")
                .attr("src",`../uploads/${data.img}`)
                .attr("class","img-thumbnail")
            )
        )
        )
    )
}