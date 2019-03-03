
function chatFun(img, user, msg, h, m){
    $("#chat-msg")
        .append(
            $("<div>")
        .attr("class","container-custom")
        .append(
            $("<div>")
            .attr("class","carder-l")
            .append(
            $("<img>")
        .attr("src",`../uploads/${img}`)
        .css("width","100%")
        )
        .append(
            $("<span>")
            .attr("class","badge badge-dark")
            .text(user)
        )
    )
    .append(
        $("<p>")
        .attr("class","text-left alert-light p-2 rounded-pill font-weight-bold")
        .text(msg)
        )
        .append(
            $("<span>")
            .attr("class","time-right")
            .text(`${h}:${m}`)
        )
        )

}

