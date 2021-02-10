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
// app.use(express.static(__dirname + '/static'));
// app.use('/static', express.static(__dirname + '/static'))
app.use(bodyParser.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.json())


app.use(express.static('./docs'))
app.use('/css', express.static(__dirname + '/docs/css'))
app.use('/js', express.static(__dirname + '/docs/scripts/js'))
app.use('/img', express.static(__dirname + '/docs/images'))



console.log(path.join(__dirname, '/docs/css'))
// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/scripts/app.js'))
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
