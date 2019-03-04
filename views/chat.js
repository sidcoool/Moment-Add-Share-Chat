let socket = io()
let userDetails

$.get("private/mom").then((data) => {

    if(data == "null")
    window.location.replace("/")

    userDetails = data
    let dataStore = {
        me,
        imgD,
        userD,
        msgD,
        timeD
    } = []

    $(() => {

        let share = false
        let shareData

        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            //e.returnValue = '';
            socket.emit("remove user", userDetails[0].user)

            let ds = JSON.stringify(dataStore)
            $.post("private/chat", {data : ds} , data => {
                if(data)
                console.log("Chat added Successfully")
                else
                console.error("error !")
            })
        })

        $("#shareText").hide()
        $.get("private/share", (data)=>{
            if(data.id !== ""){
                console.log(data)
                $("#shareText").show()

                $("#chat-input").val("Share this moment")
                shareData = data
                share = true
            }
        })

        $("#userMsg").hide()
        $("#status").hide()
        $("#active").hide()
        $("#chat-box").hide()
        console.log(userDetails.length == 0)

        let connectedUsers = []

        $("#online").click(() => {
            $("#online").attr("class", "btn btn-success m-1")
            $("#offline").attr("class", "btn btn-info m-1")
            chatter()
        })

        $("#offline").click(() => {
            $("#online").attr("class", "btn btn-info m-1")
            $("#offline").attr("class", "btn btn-success m-1")
        })


        if (userDetails.length == 0) {
            $("#userMsg").show()
        } else {
            $("#status").show()
        }

        function chatter() {

            socket.emit("add user", userDetails[0].user)

            $("#status").hide()
            $("#active").show()

            function handler(e) {
                console.log("working!")
                if (e.target.className == "users btn btn-success m-1") {
                    e.target.className = "users btn btn-info m-1"
                    let index = connectedUsers.indexOf(e.target.innerText)
                    connectedUsers.splice(index, 1)

                    socket.emit("disconnected user", {
                        userName: e.target.innerText,
                        myName: userDetails[0].user
                    })
                } else {
                    e.target.className = "users btn btn-success m-1"
                    connectedUsers.push(e.target.innerText)

                    socket.emit("connected user", {
                        userName: e.target.innerText,
                        myName: userDetails[0].user
                    })
                }

                console.log(connectedUsers)
            }


            socket.on("add user", (onlineUsers) => {
                console.log(typeof onlineUsers)
                let OnlineUsers = onlineUsers
                let index = OnlineUsers.indexOf(userDetails[0].user)
                OnlineUsers.splice(index, 1)

                $("#activeUsers").empty()
                for (let user of OnlineUsers) {
                    $("#activeUsers")
                        .append(
                            $("<button>")
                            .attr("class", connectedUsers.indexOf(user) == -1 ? "users btn btn-info m-1" : "users btn btn-success m-1")
                            .text(user)
                            .click(handler)
                        )
                }
            })


            $("#chat-box").show()

            $.get("private/chat", (chats)=>{
                for (let chat of chats) {
                    chatFun(chat.imgD, chat.userD, chat.msgD, chat.timeD)
                }
                $("#chat-box").scrollTop(Number.MAX_SAFE_INTEGER)
            })

            function sendMsg() {
                if(share){
                    socket.emit("share mom", {data: shareData, user: userDetails[0].user})
                    share = false
                }else{
                    socket.emit("send msg", {
                        userD: userDetails,
                        msg: $("#chat-input").val()
                    })
                }
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

            socket.on("share mom", (data)=>{
                shareMomFun(data)
                $("#chat-box").scrollTop(Number.MAX_SAFE_INTEGER)
            })

            socket.on("send msg", (data) => {
                console.log("socket.on at  'send msg' ")

                let date = new Date()
                let h = date.getHours()
                let m = date.getMinutes()
                if (m < 10)
                    m = "0" + m

                let time = h + ":" + m
                dataStore.push({
                    me: userDetails[0].user,
                    imgD: data.userD[0].img,
                    userD: data.userD[0].user,
                    msgD: data.msg,
                    timeD: time
                })

                chatFun(data.userD[0].img, data.userD[0].user, data.msg, time)
                $("#chat-box").scrollTop(Number.MAX_SAFE_INTEGER)
            })

        }
    })
})