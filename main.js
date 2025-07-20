const express = require('express');
const CORS = require('cors');

const app = express();

const PORT = 3000;

app.use(CORS());
app.use(express.json({ limit: '100mb' }));

const inbox = [
    {
        "user":"ronan@admin.com",
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
    },
]

const appInformation = {
    "version": "v1.0",
}

app.get('/inbox', (req, res) => {
    res.json(inbox)
})

app.get('/info', (req, res) => {
    res.json(appInformation)
})


app.post('/inbox', (req, res) => {
    const {to, subject, message, id, from, date} = req.body;
    const newEmail = {
        "subject":subject,
        "id":id,
        "to":to,
        "from":from,
        "message":message,
        "date":date,
        "vs":"1"
    }
    for(const u of inbox) {
        if(u.user === to) {
            u.emails.push(newEmail)
        }
    }

    res.send(200);
})


app.post('/info', (req, res) => {
    const {version} = req.body;

    appInformation.version = version

    res.send(200)
})

app.listen(PORT, () => {
    console.log(`hosted at port ${PORT}`)
})