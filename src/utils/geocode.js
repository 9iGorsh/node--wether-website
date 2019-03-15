'use strict'
const request =require('request')

const geocodeAddress =(address, callback) =>{
    const encodedAddress =encodeURIComponent(address)


const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiaWdvcnNoIiwiYSI6ImNqc3U0Z2ZqcDExZzQ0YXFxOHVvZmE0ZDcifQ.oM15NohhoM7i1peZt18z-w&limit=1`
//const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/127%20s%20travis%20street%20ny.json?access_token=pk.eyJ1IjoiaWdvcnNoIiwiYSI6ImNqc3U0Z2ZqcDExZzQ0YXFxOHVvZmE0ZDcifQ.oM15NohhoM7i1peZt18z-w&limit=1'

request({url, json:true}, (error, {body}) =>{
//geocodeAddress =(address, (error, data))
    if(error){
        callback('Unable to connect to API server')
    }else if(body.features.length===0){
        callback('Unable to find that address try another search')
    // }else if(response.statusCode===200){
    }else{
        callback(undefined, {
            location:body.features[0].place_name,
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0]
        })
    }
})
}

module.exports =geocodeAddress