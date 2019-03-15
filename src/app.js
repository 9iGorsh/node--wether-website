'use strict'
const express =require('express')
const path =require('path')
const hbs =require('hbs')
const forecast =require('./utils/forecast')
const geocode =require('./utils/geocode')

const app =express()

//-----------Define paths for Express config

const publicDirectoryPath =path.join(__dirname, '../public')

//We changed views directory to templates so tell Express where to look:
const viewsPath =path.join(__dirname, '../templates/views')

const partialsPath =path.join(__dirname, '../templates/partials')

//-----Setup handlebars and views location 

//Tell Express which template engine we use:
app.set('view engine', 'hbs')

//Tell Express to use new path (to former views directory):
app.set('views', viewsPath)

//Settle up handlebars:
hbs.registerPartials(partialsPath)

//-----Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setting up routes for views with .get() method:
app.get('', (req, res) =>{  //for root view
    res.render('index', {
        title:'Weather App',
        name:'Igor Sh'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About me',
        name:'Igor Sh'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title:'Help',
        name: 'Igor Sh',
        message:'In case you need help click F1'
    })
})

app.get('/weather', (req, res) =>{

    if(!req.query.address){  //req.query object from URL query
        return res.send({
            error:'You must provide the address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if(error) {
          return res.send({error})  //shorthand syntax
        }
        forecast( latitude, longitude, (error, weatherResults) =>{
            if(error) {
                return res.send({
                    error:error //regular syntax
                })
            }
            res.send({
            forecast: weatherResults,
            location, //shorthand syntax
            address: req.query.address
            })
        }) 
    })
})

//---Setting up 404 page (should be last app.get() method):
app.get('/help/*', (req, res) =>{
    //res.send('Help article is not found')
    res.render('404', {
        title:'404',
        errorMessage:'Help article was not found'
    })
})

app.get('*', (req, res) =>{
    //res.send('My 404 page')
    res.render('404', {
        title:'404',
        errorMessage:'Page not found'
    })
})
 
app.listen(3000, () =>{
    console.log('Server is running on port 3000.')
   
})
