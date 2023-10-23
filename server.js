require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Start!');
});

const messages = [];

const accounts = [
    {login_name: 'user', login_pass: 'user'},
    {login_name: 'admin', login_pass: 'admin'},
];

app.post('/', (req, res) => {
    const { login_name, login_pass } = {...req.body};
    const find = accounts.filter( account => account.login_name === login_name && account.login_pass === login_pass);
    (!find.length == 0)
        ? res.send({status: 200, user: login_name})
        : res.send({status: 401});
});

app.post('/messages', (req, res) => {
    const { name, message } = {...req.body};
    console.log(name, message);
    messages.push({name, message});
    res.sendStatus(200);
});
app.get('/messages', (req, res) => {
    res.send({data: messages});
});

app.listen(process.env.PORT, () => {
    console.log('server start');
});