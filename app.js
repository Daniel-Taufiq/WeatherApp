var app = new Vue({
    el: '#app',
    data: {
        cities1: {
            items: [],
        },
        cities2: {
            items: [],
        },
        temp: '',
        loc: ''

    },
    async mounted() {
        cities1 = ['Minneapolis', 'Hong Kong', 'Istanbul']
        cities2 = [ 'London', 'Ulaanbaatar', 'Tokyo']
        for(let i = 0; i < cities1.length; i++) {
            this.cities1.items.push(await getTemperature(cities1[i]));
            this.cities2.items.push(await getTemperature(cities2[i]));
        }
    }
});

async function getTemperature(location) {
    try {
        const tempApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;    
        let data = await this.getData(tempApi)
        return data['main']['temp']
    } catch(err) {
        console.log(err)
    }            
}

async function getData(api) {
    try{
        console.log('api is ' + api)
        const response = await fetch(api);
        console.log(response)
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


navSlide();
