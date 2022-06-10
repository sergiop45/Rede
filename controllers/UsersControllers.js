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
    if (req.session.user != undefined) {
        res.redirect("/home")
    } else {
        res.render("user/login", {msg: " "})

    }
})

Router.get("/registro", (req, res) => {

    if (req.session.user != undefined) {
        res.redirect("/home")
    } else {
        res.render("user/registro") 
    }

    
})

Router.post("/user", (req, res) => {
    
    var user = req.body.user
    var password = req.body.password

    User.findOne({where: {user:user}}).then(verificaUser => {
        
        if(verificaUser) {
            res.render("user/login", {msg: "Usuario ja registrado! Faça login"})
        } else {

            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            User.create({
                user: user,
                password: hash
            }).then(() => res.redirect("/login"))
            .catch(() =>  res.render("user/login", {msg: "Erro ao tentar registrar! tente de novo"}) 
            )}
        
    })
    
    

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
                res.render("user/login", {msg:"usuario ou senha incorretos"})
            }
        } else {
            res.render("user/login", {msg:"usuario nao existe"})

        }

    })
})

Router.get("/logout", (req,res) => {
    req.session.user = undefined;
    res.redirect("/login");
})

module.exports = Router