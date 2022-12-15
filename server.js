// Importing dependencies
const { urlencoded } = require('body-parser');
const exp = require('constants');
const express = require('express');
const { appendFile, fstat } = require('fs');
const { url } = require('inspector');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
const { v4:uuidv4 } = require('uuid');
const { title } = require('process');

// Setting up the port
var PORT = process.env.PORT || 3001;
const app = express();

//Configs the middleware to parse and serve data
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static('public'));

//Get & post routes to serve to the client
app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/notes.html'))
    console.log("received a get request");
});

app.get('/api/json',(req,res) => {
    res.json(noteData)
});

app.get('/api/notes',(req,res) => {
    res.sendFile(path.join(__dirname,'./db/db.json'))
});

//gets the value from the user input and adds to the db
app.post('/api/notes',(req,res) => {
    const { title, text } = req.body;
    const newReview = {
        title,
        text,
    }

    allReviewsstring =fs.readFileSync('./db/db.json','utf-8');
    allReviews = JSON.parse(allReviewsstring);

    allReviews.push(newReview);

    newNote = fs.writeFileSync('./db/db.json',JSON.stringify(allReviews,null,4));

    res.status(200).send("Post request has been received");
});

app.delete('/api/notes/:id',(req,res) => {
    const title1 = req.params.id;
    console.log('received a delete request');
    res.send("DELETE Request Called");
    let newNotesArray = [];
    for (i=0;i<noteData.length;i++) {
        if(noteData[i].title != title1) {
            newNotesArray.push(noteData[i]);
        }
    };
    fs.writeFileSync('./db/db.json',JSON.stringify(newNotesArray,null,4));
})

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.listen(PORT,() => {
    console.log(`app is listening at ${PORT}`);
});



