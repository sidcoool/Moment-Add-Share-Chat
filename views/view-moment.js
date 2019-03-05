$(()=>{
    $.get("private/mom", (data)=>{
        moments = data

        function shareHandler(e){
            console.log("here !")
            let realId = e.target.id.split("-")
            $.post("private/share", {momId: realId[0]}, (data)=>{
                if(data)
                console.log("Successfully shared")
            }).then(()=>{
                console.log("done !")
                window.location.replace("/chat.html")
            })
        }

        function deleteHandler(e){
            let realId = e.target.id.split("-")
            $(`#${realId[0]}-mom`).remove()

            $.post("private/del", {momId: realId[0]}, (data)=>{
                if(data)
                console.log("Successfully deleted")
            })
        }
  
        if(typeof moments !== "undefined")
        for(let moment of data){
            $("#mom-container").append(
                $("<div>")
                .attr("class","border-dark p-4 my-2")
                .attr("id",`${moment.id}-mom`)
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
                        .text("Date: " + moment.date )
                    ).append($("<br>"))
                    .append(
                        $("<h5>")
                        .attr("class","font-weight-bold")
                        .text("Place: " + moment.place)
                    ).append($("<br>"))
                    .append(
                        $("<h5>")
                        .attr("class","font-weight-bold")
                        .text("Moment: " + moment.mom_text)
                    ).append($("<br>"))
                )
                .append(
                    $("<div>")
                    .attr("class","col-6")
                    .append(
                        $("<img>")
                        .attr("src",`../uploads/${moment.img}`)
                        .attr("class","img-thumbnail")
                    )
                    .append(
                        $("<div>")
                        .attr("class","share btn btn-group mt-3 col-12 col-lg-6")
                        .append(
                            $("<button>")
                            .attr("class","btn btn-success")
                            .attr("id",`${moment.id}-success`)
                            .text("Share")
                            .click(shareHandler)
                        )
                        .append(
                            $("<button>")
                            .attr("class","btn btn-danger")
                            .attr("id",`${moment.id}-delete`)
                            .text("Delete")
                            .click(deleteHandler)
                        )
                    )
                )
                )
            )}
    })
})