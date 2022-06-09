const express = require("express")
const Router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Post = require("../models/Post")

Router.get("/home", (req, res) => {


    if (req.session.user != undefined) {
        Post.findAll({order:[ [ 'id','DESC']]}).then(posts => {
            User.findAll().then( users => {
    
                if (users != undefined) {
                    res.render("publicacoes/home", {users: users, posts: posts, user: req.session.user})
    
                }
                else {
                    res.render("publicacoes/home", {posts: posts, user: req.session.user})
                }
            
            })
            
        })
    } else {
        res.render("publicacoes/home2")
    }

   
    
})

Router.get("/login", (req, res) => {
    res.render("user/login")
})

Router.get("/registro", (req, res) => {
    res.render("user/registro")
})

Router.post("/user", (req, res) => {
    
    var user = req.body.user
    var password = req.body.password

    User.findOne({where: {user:user}}).then(verificaUser => {
        
        if(verificaUser) {
            res.send("voce ja tem cadastro faça login ")
        } else {

            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            User.create({
                user: user,
                password: hash
            }).then(() => console.log("usuario registrado!"))
            .catch(() => console.log("erro ao cadastrar usuario"))

        }
        
    })
    
    console.log(user)
    console.log(password)

    res.redirect("/login")

})

Router.post("/authenticate", (req, res) => {
    var user = req.body.user
    var password = req.body.password

    User.findOne({where: {user:user}}).then( user => {

        if (user != undefined) {
            var correct = bcrypt.compareSync(password, user.password)

            if (correct) {
                req.session.user = {
                    id: user.id,
                    user: user.user
                }
                res.redirect("/home")
            } else {
                res.send("usuario ou senha incorretos")
            }
        } else {
            res.send("usuario nao exite")
        }

    })
})

Router.get("/logout", (req,res) => {
    req.session.user = undefined;
    res.redirect("/login");
})

module.exports = Router