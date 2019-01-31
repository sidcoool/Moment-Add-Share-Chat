const express = require("express")
const app = express()
const flash = require("connect-flash")
const path = require("path")
const passport = require('./passport').passport
const session = require("express-session")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: "dont tell this to any one"
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, "views")))
app.use("/uploads",express.static(path.join(__dirname, "uploads")))

app.use("/private", require("./routes/private"))
app.use("/", require("./routes/root"))


app.listen(3333, ()=>{
    console.log("Server Running")
})
