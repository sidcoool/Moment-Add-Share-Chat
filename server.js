const express = require("express")
const app = express()
const path = require("path")
const passport = require('./passport').passport
const session = require("express-session")
const socketio = require("socket.io")
const http = require("http")
const PORT = process.env.PORT || 3333

const server = http.createServer(app)
const io = socketio(server)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(session({
    secret: '24khbkhb6k24hjb626',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, "views")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/private", require("./routes/private"))
app.use("/", require("./routes/root"))


   let  onlineUsers = []
   let usertosocket = []
   let userRooms = []

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("test", test => console.log(test))

    socket.on("send msg", (data) => {
        io.to(`${data.userD[0].user} room`).emit("send msg", data);
    })

    socket.on("add user", (user) => {
        console.log(onlineUsers)
        socket.join(`${user} room`)
        usertosocket[user] = socket

        for (let ouser of onlineUsers) {
            if(ouser !== user)
            usertosocket[ouser].leave(`${user} room`)
        }

        if(typeof userRooms[user] !== "undefined"){
            for (let room of userRooms[user]) {
                socket.join(room)
            }
        }

        if(onlineUsers.indexOf(user) == -1){
        onlineUsers.push(user)
        console.log("user added")
        console.log(onlineUsers)
        }
        io.emit("add user", onlineUsers)
    })

    socket.on("remove user", (user) => {
        console.log("removing user")
        let index = onlineUsers.indexOf(user)
        onlineUsers.splice(index, 1)
        io.emit("add user", onlineUsers)
    })

    socket.on("connected user", (user) => {
            usertosocket[user.userName].join(`${user.myName} room`)
            console.log("connected")

            if( typeof userRooms[user.userName] === "undefined"){
                 userRooms[user.userName] = []
                 userRooms[user.userName].push(`${user.myName} room`)
        }
            else if(userRooms[user.userName].indexOf(`${user.myName} room`) == -1)
            userRooms[user.userName].push(`${user.myName} room`)
    })

    socket.on("disconnected user", (user) => {
        if(typeof usertosocket[user.userName] !== "undefined")
        usertosocket[user.userName].leave(`${user.myName} room`) 
        console.log("disconnected")

        if(typeof  userRooms[user.userName] !== "undefined"){
            let index = userRooms[user.userName].indexOf(`${user.myName} room`)
            userRooms[user.userName].splice(index, 1)
        }
    })

})

server.listen(PORT, () => {
    console.log("Server Running")
})


