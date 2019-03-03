const express = require("express")
const route = express.Router()
const path = require("path")
const multer = require("multer")
const  Moments = require("../db").Moments
const upload = multer({
    dest: './uploads/'
})
const fs = require('fs')


route.get("/", (req, res) => {
    console.log("private here")
    if (req.user) {
        const dirName = path.join(__dirname, "../views")
        res.sendFile("momentAdder.html", {
            root: dirName
        }, (err) => {
            res.end();

            if (err) throw (err);
        });
    } else {
        res.redirect('/login')
    }
})


route.get("/logout", (req, res) => {
    console.log("inside logout")
    req.session.destroy(function (err) {
        () => {}
    });
})


route.get("/username", (req, res) => {
    if (req.user)
        res.send(req.user.username)
})

route.get("/mom", (req, res) => {
    if (req.user) {
        Moments.findAll({
            where: {
                user: req.user.username
            }
        }).then(data => res.send(data)).catch(err => console.error(err))
    } else {
        res.redirect("/login")
    }
})


route.post("/mom", upload.single('picture'), (req, res) => {
    if (req.user) {
        let filename = ""
        if (req.file) {
            console.log("Uploading file...")
            filename = req.file.filename + ".jpg"

            fs.rename(`./uploads/${req.file.filename}`,
                `./uploads/${req.file.filename}.jpg`, (err) => {
                    if (err)
                        console.error(err)
                        else{
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
        res.redirect("/login")
    }
})

module.exports = route