if (process.env.NODE_ENV === "development")  {
    require('dotenv').config()
}
const APY_KEY = process.env.APY_KEY
const axios = require('axios')

const express = require('express');
const app = express();

app.use(express.json())
app.use(express.static('public'))
const PORT = 4000;

app.post('/weather', (req, res) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${req.body.lat},${req.body.long}&fields=weatherCode&fields=temperature&fields=humidity&fields=windSpeed&fields=pressureSurfaceLevel&fields=precipitationProbability&timesteps=current&units=metric&apikey=${APY_KEY}`;
    
    const f = async () => {
        const promise = await axios({
            url: url,
            responseType: 'json'
          }).then(response => response.data.data.timelines[0].intervals[0].values)

        res.send(JSON.stringify(promise))
    }
    f()
})

app.listen(PORT, () => {
    console.log('server started')
})