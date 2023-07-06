if (process.env.NODE_ENV !== "production")  {
    require('dotenv').config()
}
const APY_KEY = process.env.APY_KEY
const axios = require('axios')
const express = require('express');
const app = express();
let bodyParser = require('body-parser')
app.use(express.json())
app.use(express.static('./html/apps/07_weather-app/public'))

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     
    extended: true
}));
const port = process.env.PORT || 4000;

app.post('/html/apps/07_weather-app/weather', (req, res) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${req.body.lat},${req.body.long}&fields=weatherCode&fields=temperature&fields=humidity&fields=windSpeed&fields=pressureSurfaceLevel&fields=precipitationProbability&timesteps=current&units=metric&apikey=${APY_KEY}`;
    
    const f = async () => {
        const promise = await axios({
            url: url,
            responseType: 'json'
          }).then(response => response.data.data.timelines[0].intervals[0].values)
        res.send(promise)
    }
    f()
})

app.listen(port, () => {
    console.log('server started')
})