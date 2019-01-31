$(()=>{
    $("#chat-box")
    //first
    .append(
        $("<div>")
    .attr("class","container-custom")
    .append(
        $("<div>")
        .attr("class","carder-l")
        .append(
        $("<img>")
    .attr("src","back.jpg")
    .css("width","100%")
    )
    .append(
        $("<span>")
        .attr("class","badge badge-dark")
        .text("dewed")
    )
)
.append(
    $("<p>")
    .attr("class","text-left alert-light p-2 rounded-pill font-weight-bold")
    .text("hello how are you")
    )
    .append(
        $("<span>")
        .attr("class","time-right")
        .text("11:00")
    )
    )



    //second
    .append(
        $("<div>")
    .attr("class","container-custom darker")
    .append(
        $("<div>")
        .attr("class","carder-r")
        .append(
        $("<img>")
    .attr("src","back.jpg")
    .attr("class","right")
    .css("width","100%")
    )
    .append(
        $("<span>")
        .attr("class","badge badge-dark")
        .text("dewed")
    )
)
.append(
    $("<p>")
    .attr("class","text-right alert-light p-2 rounded-pill font-weight-bold")
    .text("hello how are you")
    )
    .append(
        $("<span>")
        .attr("class","time-left")
        .text("11:02")
    )
    )
    .append(
        $("<form>")
        .attr("class","form-group")
        .append(
            $("<input>")
            .attr("type","text")
            .attr("class","form-control w-100 font-weight-bold")
            .attr("placeholder","Send Message")
            .css("background-color","whitesmoke")
        )
        .append(
            $("<span>")
            .attr("class","fa far fa-paper-plane ppl")
        )
    )

})