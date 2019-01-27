$(()=>{
    console.log("Page open")
    $("#add-btn").click(()=>{

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