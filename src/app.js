const path = require('path')
const express = require('express')
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app server',
    name: 'Alex Guzhyk'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    image: '/img/IMG_0262_2.png',
    name: 'Alex Guzhyk'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Alex Guzhyk'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
      
    })
  } else {
    const address = req.query.address
      geocode(address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }

        forecast(latitude, longtitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            forecast: forecastData.data.summary,
            location,
            address: req.query.address
          })

        })
      })
    }

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 page',
    name: 'Alex Guzhyk',
    errorMessage: 'Help acticle not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    name: 'Alex Guzhyk',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server running on port ' + port);
})