const skycons = new Skycons({ color: "black" })
let path = window.location.pathname;
let page = path.split("/").pop();
let app;
let apiURL = 'https://weather-app-2000.herokuapp.com'
function init() {
    app = new Vue({
        el: '#app',
        data: {
            cities1: {
                items: []
            },
            cities2: {
                items: []
            },
            icons1: {
                items: []
            },
            icons2: {
                items: []
            },
            temp: '',
            loc: '',
            city: '',
            localDest: '',
            localTemp: '',
            searchIcon: '',
            yourIcon: '',
            loading: true,
            loadIndex: true
        },
        async mounted() {
            if(page === "" || page === 'index.html') {  
                cities1 = ['Minneapolis', 'Hong Kong', 'Istanbul']
                cities2 = [ 'London', 'Ulaanbaatar', 'Tokyo']
                for(let i = 0; i < cities1.length; i++) {
                    this.cities1.items.push(await getTemperature(cities1[i]));
                    this.cities2.items.push(await getTemperature(cities2[i]));
                    this.icons1.items.push(await getIcons(cities1[i]))
                    this.icons2.items.push(await getIcons(cities2[i]))
                }
                
                this.setWeatherIcon()
            }
        },
        methods: {
            async setWeatherIcon() {
                console.log(this.icons1.items.length)
                for(let i = 1; i <= this.icons1.items.length; i++) {
                    skycons.add(`icon${i}`, await getSVG(this.icons1.items[i-1]))
                    skycons.add(`icon${3+i}`, await getSVG(this.icons2.items[i-1]))
                }
                skycons.play()
            },
            async searchCityTemp(location) {
                location = location = location.target.elements.tempHold.value;
                // console.log(location = location.target.elements.tempHold.value)
    
                console.log('calling backend')
                let weatherApi = `${apiURL}/weather/${location}`
                console.log('weatherApi: ', weatherApi)
                let response = await fetch(weatherApi, {
                    mode: 'cors',
                    credentials: 'include'
                })
                console.log(response)
                const json = await response.json()
                console.log('json: ', json)
                skycons.remove("icon1");
                this.searchIcon = await getIcons(location)
                skycons.add('icon1', await getSVG(this.searchIcon))
                skycons.play()
                this.temp = json['main']['temp']
                this.city = location
            }
        }
    });
    startHeroku();
}

async function startHeroku(){
    await fetch(apiURL)
    console.log('loadIndex: ', app.loadIndex, "color: red;")
    app.loadIndex = false
    console.log('loadIndex: ', app.loadIndex, "color: red;")
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
    || icon['description'] === 'drizzle' || icon['description'] === 'light intensity drizzle' ||
    icon['description'] === 'light intensity shower rain' || icon['description'] === 'heavy intensity rain') {
        return Skycons.RAIN
    }
    else if(icon['description'] === 'snow' || icon['description'] === 'light snow') {
        return Skycons.SNOW
    }
    else if (icon['description'] == 'smoke' || icon['description'] == 'haze') {
        return Skycons.FOG
    }
}
async function getTemperature(location) {
    let weatherApi = `${apiURL}/weather/${location}`

    return $.getJSON(weatherApi)
        .then(data => {
            this.loadIndex = false;
            console.log(data['main']['temp'])
            return data['main']['temp']
        })
}

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

async function yourLocation() {
    if('geolocation' in navigator) {
        console.log('geolocation is available')
        navigator.geolocation.getCurrentPosition(async position => {
            try {

                const LAT = position.coords.latitude
                const LONG = position.coords.longitude
                let weatherApi = `${apiURL}/geoLocate/`
                let response = await fetch(`${weatherApi}${LAT},${LONG}`)
                const json = await response.json()
                let yourLocation = json['results'][0]['locations'][0]['adminArea5']
                skycons.remove("icon1");
                this.yourIcon = await getIcons(yourLocation)
                skycons.add('icon1', await getSVG(this.yourIcon))
                app.loading = false
                skycons.play()
                app.localDest = yourLocation
                app.localTemp = await getTemperature(yourLocation)
                console.log("loading is now: ", app.loading)
            }catch(err) {
                console.log(err)
            }    
        })
    }
    else {
        console.log('geolocation is not available')
    }
}

async function getData(api) {
    try{
        //console.log('api is ' + api)
        const response = await fetch(api);
        //console.log(response)
        if (response.ok) {
            const text = await response.json();
            console.log(text)
            return text
        }
    } catch{
        return Promise.reject(new ResponseError('Invalid JSON: ' + error.message));
    };
}

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', ()=> {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index)=>{
            if(link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
            
        });
        // Burger animation
        burger.classList.toggle('toggle');
    });
}


if(page === "current_temp.html") {
    yourLocation()
}
navSlide();