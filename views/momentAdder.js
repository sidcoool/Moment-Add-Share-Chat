$(()=>{
    console.log("Page open")

    async function log_out() {
        await $.get("private/logout")
    }

    $("#logout-btn").click(()=>{
        log_out()
        location.reload(true)
    })

    $.get("private/username").then((username)=>{
        $("#user").text(`Welcome ${username}`)
    })

//     $("#add-btn").click(()=>{

//         $.post("private/mom", {
//             date : $("input[name=date]").val(),
//             place : $("input[name=place]").val(),
//             mom_text : $("#mom-box").val()
//         },
//         (data)=>{
//             if(data.success)
//             console.log("success")
            
//         }).fail( (data) =>{
//         alert(data.responseJSON.message)
//       })
//     })
})