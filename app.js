var app = new Vue({
    el: '#app',
    data: {
        temp: '',
    },

    methods: {
        getTemperature: function(location) {
            location = location.target.elements.tempHold.value;
            console.log(location)
            let tempApi = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82d42ea6185f3c0018888ea6bc0444e3`;                
            fetch(tempApi)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.temp = data['main']['temp'];
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    }
});