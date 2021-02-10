require('dotenv').config();
// libraries
const express = require('express')
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');

const app = express();
const port = 8000;

console.log(process.env.OWM_KEY)
app.use(express.static(__dirname + '/static'));
app.use('/static', express.static(__dirname + '/static'))
app.use(bodyParser.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.json())
app.use("/", express.static('./static/'));


console.log(path.join(__dirname, '/index.html'))
// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/app.js'))
})

app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.css'))
})

app.get('/skycons.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/skycons.js'))
})

app.get('/stars.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/stars.js'))
})

app.get('/search.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/search.html'))
})

app.get('/search.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/search.css'))
})

app.get('/current_temp.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/current_temp.html'))
})

app.get('/background.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '/background.jpg'))
})


app.get('/weather/:location', async (req, res) => {
     try {
        //console.log('req.params.location: ', req.params.location)
        const loc = req.params.location
        //const api = 'http://api.openweathermap.org/data/2.5/weather?q=Minneapolis&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3';
        const api = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`
        console.log('api: ', api)
        const fetch_response = await fetch(api)
        const json = await fetch_response.json()
        //console.log('json: ', json)
        res.json(json)
    } catch(err) {
        console.log(err)
    }
})

app.get('/geoLocate/:latlong', async (req, res) => {
    try {
        console.log('req.params.latlong: ', req.params.latlong)
        const latLong = req.params.latlong.split(',')
        const lat = latLong[0]
        console.log('lat: ', lat)
        const long = latLong[1]
        console.log('long: ', long)
        const apiURL = `http://open.mapquestapi.com/geocoding/v1/reverse?key=fxOFHGo5A85KGjqRvuHiARvinVBv4LTo&location=${lat},${long}`;
        console.log('apiURL: ', apiURL)
        const fetch_response = await fetch(apiURL)
        const json = await fetch_response.json()
        res.json(json)
    } catch(err) {
        console.log(err)
    }
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


app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
