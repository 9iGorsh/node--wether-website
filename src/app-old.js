'use strict'
const express =require('express')
const path =require('path')

const app =express()

// console.log(__dirname)
// console.log(path.join(__dirname, '../..'))

const publicDirectoryPath =path.join(__dirname, '../public')

//We changed views directory to templates so tell Express where to look:
const viewsPath =path.join(__dirname, '../templates')

app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) =>{
//     //res.send('Hello express')
//     res.send('<h1>Weather</>')
// })

// app.get('/help', (req, res) =>{
//     //res.send('Help page')
//     res.send([{
//         name:'Igor',
//         age:44
//     },{
//         name: 'Sam',
//         age:38 
//     }])
// })

// app.get('/about', (req, res) =>{
//     //res.send('About page')
//     res.send('<h1>About</h1>')
// })
 
//Tell Express which template engine we use:
app.set('view engine', 'hbs')

//Tell Express to use new path to former views directory:
app.set('views', viewsPath)

//Setting up routes for views with .getget() method:

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
        title:'Help ',
        message:'In case you need help click F1'
    })
})

app.get('/weather', (req, res) =>{
    //res.send('Weather page')
    res.send({
        forecast: 'partly cloudy',
        location: 'Latitude: , Longitude: '
    })
})

// app.get('/products', (req, res) =>{
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })    
//     }
//     //console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.listen(3000, () =>{
    console.log('Server is running on port 3000.')
   
})
