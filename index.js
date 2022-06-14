const express = require("express")
const app = express()
const port = 1015
const connection = require("./db/connection")
const User = require("./models/User")
const bodyParser = require("body-parser")
const UsersController = require("./controllers/UsersControllers")
const session = require("express-session")
const PostsController = require("./controllers/PostsController")
const CommentsController = require("./controllers/CommentsController")
const mime = require("mime-types")

connection.authenticate().then(() => {
    console.log("conectado ao Banco de dados.")
}).catch((error) => {
    console.log("Erro ao tentar conectar com banco de dados. Error: " + error)
})

app.use(express.static('public'));

mime.lookup('json') // 'application/json'
mime.lookup('.md') // 'text/markdown'
mime.lookup('file.html') // 'text/html'
mime.lookup('folder/file.js') // 'application/javascript'
mime.lookup('folder/file.css')

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: "saltsalt", cookie: {maxAge: 600000}
}));

app.use("/", UsersController)
app.use("/", PostsController)
app.use("/", CommentsController)







app.listen(port, () => {
    console.log("servidor rodando na porta " + port)
})

