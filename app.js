var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
const app = express()
app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(express.static('views'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://0.0.0.0:27017/vamshi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection
db.on('error', () => console.log('connection error'))
db.once('open', () =>
    console.log("connected to db")
)
app.post('/success', (req, res) => {
    var stdname = req.body.studentname
    var cname = req.body.course
    var age = req.body.age
    var email = req.body.email
    var data = {
        "studentname": stdname,
        "course": cname,
        "age": age,
        "email": email,
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Document has been inserted")
    })
    return res.render('success.ejs')
})
app.get('/', (req, res) => {
    return res.render('index.ejs')
}).listen(3000)
console.log("server started..")