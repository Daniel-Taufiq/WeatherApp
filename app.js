// libraries
const express = require('express')
const fetch = require("node-fetch");

// app
const app = express();

const port = 8000;

app.get('/', (req, res) => {
    res.statusCode = 200
    res.send('Hello World')
})

//localhost:8000/users/23/books/3422
app.get('/users/:userId/books/:bookId', function(req, res) {
    res.send(req.params)
    console.log(req.params)
})


let api = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=82d42ea6185f3c0018888ea6bc0444e3';

fetch(api)
    .then(response => response.json())
    .then(data => {
        var location = data['name']
        var temp = data['main']['temp']
        console.log("temp: " + temp);
        console.log("Country: " + location)
    })
    .catch(function(error) {
    console.log(error)
})




app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
