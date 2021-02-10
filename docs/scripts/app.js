const skycons = new Skycons({ color: "black" })
let path = window.location.pathname;
let page = path.split("/").pop();
var app = new Vue({
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
        localTemp: ''

    },
    async mounted() {
        cities1 = ['Minneapolis', 'Hong Kong', 'Istanbul']
        cities2 = [ 'London', 'Ulaanbaatar', 'Tokyo']
        for(let i = 0; i < cities1.length; i++) {
            this.cities1.items.push(await getTemperature(cities1[i]));
            this.cities2.items.push(await getTemperature(cities2[i]));
            this.icons1.items.push(await getIcons(cities1[i]))
            this.icons2.items.push(await getIcons(cities2[i]))
        }
        this.setWeatherIcon()
    },
    methods: {
        async setWeatherIcon() {
            //skycons.add('icon1', Skycons.Cloudy)
            // skycons.play()
            console.log(this.icons1.items.length)
            for(let i = 1; i <= this.icons1.items.length; i++) {
                skycons.add(`icon${i}`, await getSVG(this.icons1.items[i-1]))
                skycons.add(`icon${3+i}`, await getSVG(this.icons2.items[i-1]))
                // console.log(`set icon${i} using`, this.icons1.items[i-1])
                // console.log(`set icon${3+i} using`, this.icons2.items[i-1])
            }
            skycons.play()
        },
        async searchCityTemp(location) {
            try {
                location = location.target.elements.tempHold.value;
                console.log(location)
                let tempApi = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;    
                const data = await getData(tempApi)
                this.temp = data['main']['temp']
                this.city = location
            } catch(err) {
                console.log(err)
            }
        }
    }
});

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
    || icon['description'] == 'mist' || icon['description'] === 'moderate rain' || icon['description'] === 'light rain') {
        return Skycons.RAIN
    }
    else if(icon['description'] === 'snow' || icon['description'] === 'light snow') {
        return Skycons.SNOW
    }
    else if (icon['description'] == 'smoke') {
        return Skycons.FOG
    }
}
async function getTemperature(location) {
    try {
        const tempApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;    
        let data = await this.getData(tempApi)
        console.log(data['main']['temp'])
        return data['main']['temp']
    } catch(err) {
        console.log(err)
    }            
}

async function getIcons(location) {
    try {
        const tempApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;    
        let data = await this.getData(tempApi)
        console.log(data['weather'][0])
        return data['weather'][0]
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
                const reverseGEO = `http://open.mapquestapi.com/geocoding/v1/reverse?key=fxOFHGo5A85KGjqRvuHiARvinVBv4LTo&location=${LAT},${LONG}`;
                let data = await this.getData(reverseGEO)
                let yourLocation = data['results'][0]['locations'][0]['adminArea5']
                app.localDest = yourLocation
                app.localTemp = await getTemperature(yourLocation)
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
