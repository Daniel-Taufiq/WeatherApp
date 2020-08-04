//import fetch from "node-fetch";


var app = new Vue({
    el: '#app',
    data: {
        temp: '',
    },

    methods: {
        async getTemperature(location) {
            try {
                location = location.target.elements.tempHold.value;
                console.log(location)
                let tempApi = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;    
                
                const data = await this.getData2(tempApi)
                this.temp = data['main']['temp']
            } catch(err) {
                console.log(err)
            }
            
        },
         async getData(api) {
            console.log('before fetch')
            let response = await fetch(api)
            console.log(response)
            let text = await response.json()
            console.log(text)
            return text
        },
        getData2: async function(api) {
            try{
                const response = await fetch(api);
                if (response.ok) {
                    let text = await response.json();
                    console.log(text)
                    return text
                }
            } catch{
                return Promise.reject(new ResponseError('Invalid JSON: ' + error.message));
            };
        }
        // getUnits: function() {
            
        // }
    },
    
    computed: {

    }
});