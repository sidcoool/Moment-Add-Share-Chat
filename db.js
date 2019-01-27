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

User.sync().then(()=>{console.log("Synced Successfully")}).catch(err=>{console.error(err)})

module.exports = {
    User
}