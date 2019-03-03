const Sequelize = require("sequelize")

const sequelize = new Sequelize("mytest", "sidcool", "sid", {
    host: "localhost",
    dialect: "mysql"
})

// const sequelize = new Sequelize("d26mciklunk1b1", "iumzkmtazrxfpl", "f2273845491c669c94c4a3437619d7f05c6b2c43fc6a6f3536054a19b95526f3", {
//     host: "ec2-54-83-44-4.compute-1.amazonaws.com",
//     dialect: "postgres"
// })

const User = sequelize.define("user", {
    id : {
        type: Sequelize.INTEGER,
        allowNull : false,
        autoIncrement:  true,
        primaryKey: true
    },
        Fname: Sequelize.STRING,
        Lname: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING
})

const Moments = sequelize.define("moments", {
    img: Sequelize.STRING,
    user: Sequelize.STRING,
    date: Sequelize.STRING,
    place: Sequelize.STRING,
    mom_text: Sequelize.STRING
})


User.sync().then(()=>{console.log("Synced User DB Successfully")}).catch(err=>{console.error(err)})
Moments.sync().then(()=>{console.log("Synced Moments DB Successfully")}).catch(err=>{console.error(err)})

module.exports = {
    User,Moments
}