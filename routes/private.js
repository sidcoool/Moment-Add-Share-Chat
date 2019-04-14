const express = require("express")
const route = express.Router()
const path = require("path")
const multer = require("multer")
const Moments = require("../db").Moments
const Chat = require("../db").Chat
const sharp = require("sharp")
const upload = multer({
    dest: './uploads/'
})
const fs = require('fs')

let sharedMoment = {
    id: "",
    date :"",
    place: "",
    mom: "",
    img: ""
}

route.get("/", (req, res) => {
    console.log("private here")
    if (req.user) {
        const dirName = path.join(__dirname, "../views")
        res.sendFile("momentAdder.html", {
            root: dirName
        }, (err) => {
            res.end()
            if (err) throw (err);
        });
    } else {
        res.redirect('/login')
    }
})


route.get("/logout", (req, res) => {
    console.log("inside logout")
    req.session.destroy((err) => {
        () => {}
    });
})


route.get("/username", (req, res) => {
    if (req.user)
        res.send(req.user.username)
})

route.post("/chat", (req, res) => {
    Chat.bulkCreate(JSON.parse(req.body.data)).then((data) => {
        res.send(true)
    })
})

route.get("/chat", (req, res) => {
    Chat.findAll({
        where: {
            me: req.user.username
        }
    }).then(data => {
        res.send(data)
    }).catch(err => console.error(err))
})

route.post("/del", (req, res) => {
    Moments.destroy({
        where: {
            id: req.body.momId
        }
    }).then((data) => {
        res.send(true)
    })
})

route.post("/share", (req, res) => {
    console.log("------------------------------------------------")
    Moments.findOne({
        where: {
            id: req.body.momId
        }
    }).then((data) => {
        sharedMoment.date = data.date
        sharedMoment.id = data.id
        sharedMoment.place = data.place
        sharedMoment.mom = data.mom_text
        sharedMoment.img = data.img

        res.send(true)
    })
})

route.get("/share", (req, res) => {
    res.send(sharedMoment)
    sharedMoment.date = ""
    sharedMoment.id = ""
    sharedMoment.date = ""
    sharedMoment.mom = ""
    sharedMoment.img = ""
})

route.get("/mom", (req, res) => {
    if (req.user) {
        console.log("++++++++++++++++++++++++")
        console.log(req.user.username)
        console.log("++++++++++++++++++++++++")
        Moments.findAll({
            where: {
                user: req.user.username
            }
        }).then(data => {
            res.send(data)
        }).catch(err => console.error(err))
    } else {
        res.send("null")
    }
})


route.post("/mom", upload.single('picture'), (req, res) => {
    if (req.user) {
        console.log("++++++++++++++++++++++++")
        console.log(req.user.username)
        console.log("++++++++++++++++++++++++")
        let filename = ""
        if (req.file) {
            console.log("Uploading file...")
            filename = req.file.filename + "_new" + ".jpg"

            fs.rename(`./uploads/${req.file.filename}`,
                `./uploads/${req.file.filename}.jpg`, (err) => {
                    if (err)
                        console.error(err)
                    else {

                        sharp(`./uploads/${req.file.filename}.jpg`).resize(200, 200).toFile(`./uploads/${req.file.filename}_new.jpg`, (err) => {
                            if(err)
                            console.error(err)
                            else
                            fs.unlinkSync(`./uploads/${req.file.filename}.jpg`)
                        })
                        Moments.create({
                            img: filename,
                            user: req.user.username,
                            date: req.body.date,
                            place: req.body.place,
                            mom_text: req.body.momentText
                        }).then((data) => {
                            console.log(data)
                            res.redirect("/private")
                        }).catch(e => console.error(e))
                    }
                })
        }
    } else {
        res.redirect("/")
    }
})

module.exports = route