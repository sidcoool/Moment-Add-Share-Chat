let socket = io()
//const onlineUsers = require("../db").OnlineUsers        
let userDetails

$.get("private/mom").then((data) => {
    userDetails = data

    // onlineUsers.create({
    //     username: data[0].user
    // })

    $(() => {
        $("#userMsg").hide()
        $("#status").hide()
        $("#active").hide()
        $("#chat-box").hide()
        console.log(userDetails.length == 0)

        let status = false
        let connectedUsers = []

        $("#online").click(() => {
            status = true;
            chatter()
            $("#online").attr("class", "btn btn-success m-1")
            $("#offline").attr("class", "btn btn-info m-1")
        })

        $("#offline").click(() => {
            status = false;
            $("#online").attr("class", "btn btn-info m-1")
            $("#offline").attr("class", "btn btn-success m-1")
        })


        if (userDetails.length == 0) {
            $("#userMsg").show()
        } else {
            $("#status").show()
        }

        function chatter() {
            if (status == true) {

                socket.emit("add user", userDetails[0].user)

                $("#status").hide()
                $("#active").show()

                socket.on("add user", (onlineUsers) => {
                    console.log(typeof onlineUsers)
                   userAdd(connectedUsers,onlineUsers)
                })

                

                //   setInterval(()=>{
                //       console.log("set time out working")
                //       $("#activeUsers").empty()

                //     //   onlineUsers.findAll({}).then(userArr => {



                //         for (let user of userArr) {
                //             $("#activeUsers")
                //             .append(
                //                 $("<button>")
                //                 .attr("class",connectedUsers.indexOf(user) == -1 ? "users btn btn-info m-1" : "users btn btn-success m-1")
                //                 .text(user)
                //                 )
                //           }

                //   }, 5000)

                $(".users").on("click", (e) => {
                    if (e.target.className == "users btn btn-success m-1") {
                        e.target.className = "users btn btn-info m-1"
                        let index = connectedUsers.indexOf(e.target.innerText)
                        connectedUsers.splice(index, 1)
                    } else {
                        e.target.className = "users btn btn-success m-1"
                        connectedUsers.push(e.target.innerText)
                    }

                    console.log(connectedUsers)
                })

                $("#chat-box").show()

                function sendMsg() {
                    console.log("#btn clicked")
                    socket.emit("send msg", {
                        userD: userDetails,
                        msg: $("#chat-input").val()
                    })
                    $("#chat-input").val("")
                }

                $("#chat-input").keydown((ev) => {
                    if (ev.keyCode == 13) {
                        ev.preventDefault()
                        sendMsg()
                    }
                })

                $("#chat-btn").click(() => {
                    sendMsg()
                })

                socket.on("send msg", (data) => {
                    console.log("socket.on at  'send msg' ")

                    let date = new Date()
                    let h = date.getHours()
                    let m = date.getMinutes()
                    if (m < 10)
                        m = "0" + m
                    chatFun(data.userD[0].img, data.userD[0].user, data.msg, h, m)
                })
            }
        }
    })
})