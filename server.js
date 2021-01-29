// libraries
const express = require('express')
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8000;

//app.use('/static', express.static('./static/'))
app.use(express.static(__dirname + '/static'));
app.use('/static', express.static(__dirname + '/static'))
app.use(bodyParser.json());
app.use(express.urlencoded( { extended: true }));

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/app.js'))
})

app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.css'))
})


//localhost:8000/users/23/books/3422
app.get('/users/:userId/books/:bookId', function(req, res) {
    res.send(req.params)
    console.log(req.params)
})


const api = 'http://api.openweathermap.org/data/2.5/weather?q=Minneapolis&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3';

// put inside a function
fetch(api)
    .then(response => response.json())
    .then(data => {
        var location = data['name']
        var temp = data['main']['temp']
        var id = data['id']
        console.log("temp: " + temp)
        console.log("Country: " + location)
        console.log('id: ' + id)
    })
    .catch(function(error) {
    console.log(error)
})

// function getTemperature(location) {
//     let tempApi = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;

//     fetch(tempApi)
//         .then(response => response.json())
//         .then(data => {
//             return data['main']['temp'];
//         })
//         .catch(function(error) {
//             console.log(error)
//         })
// }

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
