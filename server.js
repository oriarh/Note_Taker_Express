const { urlencoded } = require('body-parser');
const exp = require('constants');
const express = require('express');
const { appendFile, fstat } = require('fs');
const { url } = require('inspector');
const path = require('path');
const noteData = require('./Develop/db/db.json');
const fs = require('fs');

var PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname,'Develop/public/notes.html'))
});

app.get('/api/json',(req,res) => {
    res.json(noteData)
});

app.get('/api/notes',(req,res) => {
    res.sendFile(path.join(__dirname,'Develop/db/db.json'))
});

app.post('/api/notes',(req,res) => {
    console.log(req.body);
    // const title = JSON.stringify(req.body.title);
    // const text = req.body.text;
    // const { title, text} = req.body;
    const data = JSON.stringify(req.body);
    newNote = fs.appendFileSync('./Develop/db/db.json',data);
    res.status(200).send("Post request has been received");
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'Develop/public/index.html'));
});

app.listen(PORT,() => {
    console.log(`app is listening at ${PORT}`);
});



