const Sequelize = require("sequelize")
const connection = require("../db/connection")
const Post = require("./Post")
const User = require("./User")

const Comment = connection.define("Comments", {
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    like: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Post.hasMany(Comment) // um post tem varios comentarios
Comment.belongsTo(Post) //um comentario pertence a um posto
Comment.belongsTo(User)
Comment.sync({force: false}).then(() => console.log("tabela comment criada"))
.catch(() => console.log("erro ao tentar criar tabela comment"))

module.exports = Comment