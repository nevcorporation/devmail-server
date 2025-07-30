const express = require('express');
const CORS = require('cors');

const mongoose = require('mongoose');

const User = require('./models/users');

const mongooseStr = 'mongodb+srv://admin:ih8usomuch@emaildb.ilmvmnl.mongodb.net/devmail?retryWrites=true&w=majority&appName=emaildb'

mongoose.connect(mongooseStr)
    .then(() => console.log("working"))
    .catch(error => console.error('not working'));

const app = express();

const PORT = 3000;

app.use(CORS());
app.use(express.json({ limit: '100mb' }));

/*const inbox = [
    {
        "user":"ronan@admin.com",
        "name":"ronan",
        "password":"rickastley12-!",
        "emails": [
            {
                "subject":"Welcome",
                "id":"5325235325325233",
                "to":"ronan@admin.com",
                "from":"ronan@admin.com",
                "message":"Welcome back Ronan!, Just remember you have to change the version every update!",
                "date":"19/07/2025 10:16pm",
                "vs":"1"
            }
        ]
    }
] */

const appInformation = {
    "version": "v1.1",
}

app.get('/inbox', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/info', (req, res) => {
    res.json(appInformation)
})


app.post('/inbox', async (req, res) => {
    const { to, subject, message, id, from, date } = req.body;

    const user = await User.findOne({ user: to });
    if (!user) return res.sendStatus(404);

    user.emails.push({ subject, id, to, from, message, date, vs: "1" });
    await user.save();

    res.status(200).json({ message: "OK" });
})


app.post('/signup', async (req, res) => {
    const {user, password, name} = req.body;

    const existingUser = await User.findOne({ user });
    if(existingUser) return res.sendStatus(400);

    const newUser = new User({user, name,password, emails: []});
    await newUser.save();

    res.sendStatus(200)
})






app.post('/info', (req, res) => {
    const {version} = req.body;

    appInformation.version = version

    res.send(200)
})

app.get('/', (req, res) => {
    res.send("<h1>404</h1><br>Access Denied")
})

app.listen(PORT, () => {
    console.log(`hosted at port ${PORT}`)
})