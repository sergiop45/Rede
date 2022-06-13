const express = require("express")
const Router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")


Router.get("/comment/:id", (req, res) => {
    var postid = req.params.id
    
    Comment.findByPk(postid).then( comment => {

        res.render("publicacoes/comentario", {postId: postid, user: req.session.user})
    })
    
})

Router.post("/comment", (req,res) => {
    var postId = req.body.postId
    var user = req.body.userId
    var comment = req.body.comment
    
    Comment.create({
        
        postId: postId,
        userId: user,
        comment: comment,
        like: 0
    }).then(() => res.redirect("/home")).catch(() => res.redirect("/home"))
})

Router.get("/comentar", (req, res) => {
    res.render("publicacoes/comentar")
})

module.exports = Router