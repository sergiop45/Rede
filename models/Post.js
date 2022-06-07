const Sequelize = require("sequelize")
const connection = require("../db/connection")
const User = require("./User")

const Post = connection.define("posts", {
    post: {
        type: Sequelize.STRING,
        allowNull: false
    },
    like: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

User.hasMany(Post) // um usuario tem muitos posts
Post.belongsTo(User) //um post pertence a um usuario

Post.sync({force: false}).then(() => console.log("tabela post criada"))
.catch(() => {console.log("erro ao tentar criar tabela post")})

module.exports = Post