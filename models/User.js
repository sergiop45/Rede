const Sequelize = require("sequelize")
const connection = require("../db/connection")

const User = connection.define("user", {
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false}).then( () =>  console.log("tabela user criada"))
.catch(() => console.log("erro ao criar tabela user"))

module.exports = User