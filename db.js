const Sequelize = require("sequelize")
const config = require("./config")



const sequelize = new Sequelize(config.dev.database, config.dev.user, config.dev.password, {
    host: config.dev.host,
    dialect: config.dev.dialect
})

//  const sequelize = new Sequelize(config.prod.database, config.prod.user, config.prod.password, {
//     host: config.prod.host,
//     dialect: config.prod.dialect
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
    id : {
        type: Sequelize.INTEGER,
        allowNull : false,
        autoIncrement:  true,
        primaryKey: true
    },
    img: Sequelize.STRING,
    user: Sequelize.STRING,
    date: Sequelize.STRING,
    place: Sequelize.STRING,
    mom_text: Sequelize.STRING
})

const Chat = sequelize.define("chat", {
    me: Sequelize.STRING,
    imgD: Sequelize.STRING,
    userD: Sequelize.STRING,
    msgD: Sequelize.STRING,
    timeD: Sequelize.STRING
})


User.sync().then(()=>{console.log("Synced User DB Successfully")}).catch(err=>{console.error(err)})
Moments.sync().then(()=>{console.log("Synced Moments DB Successfully")}).catch(err=>{console.error(err)})
Chat.sync().then(()=>{console.log("Synced Chat DB Successfully")}).catch(err=>{console.error(err)})

module.exports = {
    User,Moments,Chat
}