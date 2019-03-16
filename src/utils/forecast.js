const request =require('request')

const forecast =(lat, lng, callback) =>{
    const url =`https://api.darksky.net/forecast/9fb8374043761251a65704ad711ae4e1/${lat},${lng}`
    request({url, json:true}, (error, {body}) =>{
    if(error){
        callback('Unable to connect to weather service')
    }else if(body.error){
        callback('Unable to find location')
    }else{
        callback(undefined, `${body.daily.data[0].summary}.
         It is currently ${body.currently.temperature} degrees out there.
         The tempreture high is ${body.daily.data[0].temperatureHigh}.
         The temperature low is ${body.daily.data[0].temperatureLow}.`)
    }
})
}
//40.687635,-73.371717
module.exports =forecast
