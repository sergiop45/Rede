const express = require("express")
const Router = express.Router()
const Post = require("../models/Post")
const User = require("../models/User")

Router.get("/post", (req, res) => {
    
    if (req.session.user != undefined ) {
        
    Post.findAll().then(posts => {
        User.findAll({order: ['id', 'DESC']}).then( users => {

            if (users != undefined) {
                res.render("publicacoes/home", {users: users, posts: posts, user: req.session.user})

            }
            else {
                res.render("publicacoes/home", {posts: posts, user: req.session.user})
            }
        
        })
        
    })
    }else {
        res.render("publicacoes/home2")
    }


})


Router.get("/newpost", (req, res) => {
    User.findByPk(req.session.user.id).then( user => {
        res.render("publicacoes/new", {user: user})
    })
})

Router.post("/post", (req, res) => {
    var userid = req.body.userid
    var post = req.body.post

    Post.create({
        userId: userid,
        post: post,
        like: 0
    }).then(() => res.redirect("/home")).catch(() => res.redirect("/newpost"))

})


module.exports = Router