$(()=>{
    async function log_out() {
        await $.get("private/logout")
    }
    
    $("#logout-btn").click(()=>{
        log_out()
        window.location.replace("/")
    })
})