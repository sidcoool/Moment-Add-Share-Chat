const express = require("express")
const app = express()
const path = require("path")
const passport = require('./passport').passport
const session = require("express-session")
const socketio = require("socket.io")
const http = require("http")

const server = http.createServer(app)
const io = socketio(server)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: '24khbkhb6k24hjb626',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, "views")))
app.use("/uploads",express.static(path.join(__dirname, "uploads")))

app.use("/private", require("./routes/private"))
app.use("/", require("./routes/root"))

let usertoid = []
let client, realMsg 

io.on("connection", (socket)=>{
    console.log(socket.id)
    socket.on("send msg", (data)=>{
        console.log(data)
        usertoid[data.userD[0].user] = socket.id

        let msgVal = data.msg
        if(msgVal.startsWith("@")){
             client = msgVal.split(":")[0].substring(1)
             realMsg = msgVal.split(":")[1].trim()
        }
        if(client && realMsg && usertoid[client])
        io.to(usertoid[client]).emit("send msg", {
            user: data.userD,
            msg: realMsg
        })
        else
       io.emit("send msg", data)
    })
})


server.listen(3333, ()=>{
    console.log("Server Running")
})
