const express = require("express")
const Router = express.Router()
const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")

Router.get("/post", (req, res) => {
    
    if (req.session.user != undefined) {
        Post.findAll({order:[ [ 'id','DESC']]}).then(posts => {
            User.findAll().then( users => {
                
                    if (users != undefined) {
                        Comment.findAll().then( comment => {
                        res.render("publicacoes/home", {users: users, posts: posts, user: req.session.user, comments:comment})
                        })
                    }
                    else {
                        Comment.findAll().then( comment => {
                        res.render("publicacoes/home", {posts: posts, user: req.session.user, comments:comment})
                        })
                    }
                })
                
            
            
            
        })
    } else {
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

Router.get("/like/:id", (req, res) => {
    var postId = req.params.id
    

    if (req.session.user != undefined) {
        Post.findByPk(postId).then(post => {
            if (post != undefined) {
                var novolike = post.like
                Post.update({like: novolike+1 }, {where: {id:postId}})
                .then(() => res.redirect("/post")).catch(() => res.redirect("/post"))
            } else {
                res.redirect("/post")
            }
        })
        
        
    } else {
        res.redirect("/login")
    }

})

Router.get("/deslike/:id", (req, res) => {
    var postId = req.params.id
    

    if (req.session.user != undefined) {
        Post.findByPk(postId).then(post => {
            if (post != undefined) {
                var novolike = post.like
                Post.update({like: novolike-1 }, {where: {id:postId}})
                .then(() => res.redirect("/post")).catch(() => res.redirect("/post"))
            } else {
                res.redirect("/post")
            }
        })
        
        
    } else {
        res.redirect("/login")
    }

})


module.exports = Router