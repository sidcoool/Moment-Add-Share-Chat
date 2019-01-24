$(()=>{
    console.log("Page open")
    $("#add-btn").click(()=>{
        console.log("btn clicked")
        let date = $("input[name=date]").val()
        let place = $("input[name=place]").val()
        let mom_text = $("#mom-box").val()
        // console.log(date)
        // console.log(place)
        // console.log(mom_text)

        $.post("/mom-post", {
            date : $("input[name=date]").val(),
            place : $("input[name=place]").val(),
            mom_text : $("#mom-box").val()
        },
        (data)=>{
            if(data.success)
            console.log("success")
        }).fail( (data) =>{
        alert(data.responseJSON.message)
      })
    })

})