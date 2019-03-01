
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

        $("#chat-box").scrollTop(Number.MAX_SAFE_INTEGER)
}

function userAdd(connectedUsers, onlineUsers){
    $("#activeUsers").empty()
    for (let user of onlineUsers) {
        $("#activeUsers")
            .append(
                $("<button>")
                .attr("class", connectedUsers.indexOf(user) == -1 ? ".users btn btn-info m-1" : ".users btn btn-success m-1")
                .text(user)
            )
    }
}



//chatFun(data.userD[0].img, data.userD[0].use, data.msg, h, m)