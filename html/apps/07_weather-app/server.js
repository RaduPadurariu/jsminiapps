if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const axios = require('axios')
const TOMORROW_IO_APY_KEY = process.env.TOMORROW_IO_APY_KEY
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.static('public'))
const PORT = 4000;


app.post('/weather', (req, res) => {
    console.log(req.body)
    const url = `https://api.tomorrow.io/v4/timelines?location=${req.body.lat},${req.body.long}&fields=weatherCode&fields=temperature&fields=humidity&fields=windSpeed&fields=pressureSurfaceLevel&fields=precipitationProbability&timesteps=current&units=metric&apikey=OmP7CrOzvG40m3NR8WliR5Ws3xv7QFso`;
    
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