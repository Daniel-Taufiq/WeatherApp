require('dotenv').config();
// libraries
const express = require('express')
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
let cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;
const owm_key = process.env.OWM_KEY
const mq_key = process.env.MQ_KEY


app.use(bodyParser.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.json())
app.use(cors());

app.use(express.static('./docs'))
app.use('/css', express.static(__dirname + '/docs/css'))
app.use('/js', express.static(__dirname + '/docs/scripts/js'))
app.use('/img', express.static(__dirname + '/docs/images'))


// routes
app.get('/', (req, res) => {
    respondWithData(res, 'text/plain', 'data online')
});

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://weather-app-2000.herokuapp.com");
    next();
});

app.get('/weather/:location', async (req, res) => {
     try {
        console.log('weather req.params.location: ', req.params.location)
        const loc = req.params.location
        const api = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=imperial&appid=${owm_key}`
        //console.log('api: ', api)
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
        console.log('geolocate req.params.latlong: ', req.params.latlong)
        const latLong = req.params.latlong.split(',')
        const lat = latLong[0]
        console.log('lat: ', lat)
        const long = latLong[1]
        console.log('long: ', long)
        const apiURL = `http://open.mapquestapi.com/geocoding/v1/reverse?key=${mq_key}&location=${lat},${long}`;
        console.log('apiURL: ', apiURL)
        const fetch_response = await fetch(apiURL)
        const json = await fetch_response.json()
        res.json(json)
    } catch(err) {
        console.warn(xhr.responseText)
        console.log(err)
    }
})



// put inside a function
// fetch(api)
//     .then(response => response.json())
//     .then(data => {
//         var location = data['name']
//         var temp = data['main']['temp']
//         var id = data['id']
//         console.log("temp: " + temp)
//         console.log("Country: " + location)
//         console.log('id: ' + id)
//     })
//     .catch(function(error) {
//     console.log(error)
// })


app.listen(port, () => console.log(`Server running on http://localhost:${port}`))