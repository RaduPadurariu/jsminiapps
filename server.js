if (process.env.NODE_ENV !== "production")  {
    require('dotenv').config()
};
const axios = require('axios');
const express = require('express');


const APY_KEY = process.env.APY_KEY;

const app = express();
let bodyParser = require('body-parser');
app.use(express.json());
app.use(express.static('./'));

app.use(bodyParser.json() );      
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.post('/html/apps/07_weather-app/public/weather', (req, res) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${req.body.lat},${req.body.long}&fields=weatherCode&fields=temperature&fields=humidity&fields=windSpeed&fields=pressureSurfaceLevel&fields=precipitationProbability&timesteps=current&units=metric&apikey=${APY_KEY}`;
    
    const f = async () => {
        const promise = await axios({
            url: url,
            responseType: 'json'
          }).then(response => response.data.data.timelines[0].intervals[0].values)
        res.send(JSON.stringify(promise));
    }
    f();
});

app.listen(process.env.PORT || 4000, () => {
    console.log('server started')
});