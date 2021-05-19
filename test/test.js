var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


let cities = ['Minneapolis', 'Hong Kong', 'Istanbul', 'London', 'Ulaanbaatar', 'Tokyo']

async function getIcons(location) {
    try {
        let weatherApi = `${apiURL}/weather/${location}`
        let val = fetch(weatherApi)
        console.log('calling backend')
        let response = await fetch(weatherApi)
        const json = await response.json()
        return json['weather'][0]
    } catch(err) {
        console.log(err)
    }    
}


async function getSVG(icon) {
    //https://openweathermap.org/weather-conditions
    //https://codepen.io/palimadra/pen/vfncA
    if(icon['description'] === 'clear sky') {
        if(icon['icon'] == '01d') {
            return Skycons.CLEAR_DAY
        } else {
            return Skycons.CLEAR_NIGHT
        }
    }
    else if(icon['description'] === 'few clouds') {
        if(icon['icon'] == '02d') {
            return Skycons.PARTLY_CLOUDY_DAY
        } else {
            return Skycons.PARTLY_CLOUDY_NIGHT
        }
    }
    else if(icon['description'] === 'scattered clouds' || icon['description'] === 'broken clouds' || icon['description'] == 'overcast clouds') {
        return Skycons.CLOUDY
    }
    else if(icon['description'] === 'shower rain' || icon['description'] === 'rain' || icon['description'] === 'thunderstorm' 
    || icon['description'] == 'mist' || icon['description'] === 'moderate rain' || icon['description'] === 'light rain'
    || icon['description'] === 'drizzle' || icon['description'] === 'light intensity drizzle') {
        return Skycons.RAIN
    }
    else if(icon['description'] === 'snow' || icon['description'] === 'light snow') {
        return Skycons.SNOW
    }
    else if (icon['description'] == 'smoke' || icon['description'] == 'haze') {
        return Skycons.FOG
    }
}
let icons1 = []
let svg = ''

async function start() {
    for(let i = 0; i < cities.length; i++) {
        console.log('i = ', i)
        icons1.items.push(await getIcons(cities[i]))
        svg = await getSVG(yourIcon[i])
        it('svg should return a non-empty string', function(done) {
            if(svg === '') {
                done(err)
            } else done();
        })
    }
}

start()

