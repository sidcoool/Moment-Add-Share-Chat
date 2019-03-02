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
   connectedUsers = []


io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("send msg", (data) => {
        io.to(`${data.userD[0].user} room`).emit("send msg", data);
    })

    socket.on("add user", (user) => {
        if(onlineUsers.indexOf(user) == -1){
        onlineUsers.push(user)
        usertosocket[user] = socket
        socket.join(`${user} room`)
        }
        io.emit("add user", onlineUsers)
    })

    socket.on("remove user", (user) => {
        let index = onlineUsers.indexOf(user)
        onlineUsers.splice(index, 1)
        socket.leave(`${user} room`)
        io.emit("remove user", onlineUsers)
    })

    // socket.on("connected user", (connectedUsers)=>{

    // })

    socket.on("connected user", (user) => {
        connectedUsers[user.myName] = user.connectedUsers.slice()

            usertosocket[user.userName].join(`${user.myName} room`)
            console.log("==============================")
            console.log(connectedUsers[user.userName])
            console.log("==============================")
    })

    socket.on("disconnected user", (user) => {
        connectedUsers[user.myName] = user.connectedUsers.slice()

        console.log("+++++++++++++++++++++++++++")
            console.log(connectedUsers[user.userName])
            console.log("+++++++++++++++++++++++++++")

             usertosocket[user.userName].leave(`${user.myName} room`)


        // if(typeof connectedUsers[user.userName] === "undefined"){
        //     console.log("undefined working !")
        //     socket.leave(`${user.userName} room`)
        // }
        //     else if(connectedUsers[user.userName].indexOf(user.myName) === -1){
        //         console.log("indexof working !")
        //     socket.leave(`${user.userName} room`)
        //     }
    })
    
})

server.listen(PORT, () => {
    console.log("Server Running")
})


// usertoid[data.userD[0].user] = socket.id

// let msgVal = data.msg
// if(msgVal.startsWith("@")){
//      client = msgVal.split(":")[0].substring(1)
//      realMsg = msgVal.split(":")[1].trim()
// }
// if(client && realMsg && usertoid[client])
// io.to(usertoid[client]).emit("send msg", {
//     user: data.userD,
//     msg: realMsg
// })
// else