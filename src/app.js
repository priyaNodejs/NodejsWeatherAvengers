const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const pathDir = path.join('__dirname','../public')
const viewDir = path.join('__dirname','../templates/views')
const partialsPath =  path.join('__dirname','../templates/partials')

//Setup handlebars and view
app.set('views', viewDir)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(pathDir))

app.get('',(req , res) => {
    res.render('index',{
        title: 'Avengers',
        name: 'Benedict',
        footerTitle: 'CumberBatch'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        name: 'Avengers',
        title: 'Infinity war',
        footerTitle: 'Thanos'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helptext : 'The help page text',
        name: 'Batman',
        title: 'Dark knight',
        footerTitle: 'Christopher Nolan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return  res.send({
            error: 'Address is empty'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send('Error '+ error )
        } 
        forecast(latitude, longitude , (error, forecastData )=>{
            if(error){
                return res.send('Error ',error)
            }
            res.send({
                  forecast: forecastData,
                  location: location,
                  address: req.query.address
              })
        })
       
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return  res.send({
            error: 'Search is empty'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 404,
        name: 'Priya',
        errorMsg: 'Help Not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 404,
        name: 'Priya',
        errorMsg: 'Page Not found '
    })
})

app.listen(port , () =>  {
    console.log('Listening '+port+' port...')
})
