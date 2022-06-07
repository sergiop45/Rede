const express = require("express")
const Router = express.Router()
const Comment = require("../models/Comment")

Router.get("/comments", (req, res) => {
    res.send("comments")
})

module.exports = Router