const Sequelize = require("sequelize")

const sequelize = new Sequelize("mytest", "sidcool", "sid", {
    host: "localhost",
    dialect: "mysql"
})

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