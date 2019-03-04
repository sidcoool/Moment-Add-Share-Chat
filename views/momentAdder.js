$(()=>{
    console.log("Page open")

    async function log_out() {
        await $.get("private/logout")
    }

    $("#logout-btn").click(()=>{
        log_out()
        window.location.replace("/")
    })

    $.get("private/username").then((username)=>{
        $("#user").text(`Welcome ${username}`)
    }).then(()=>{
        console.log("added successfully")
    }).catch((e)=>{
        console.error(e)
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