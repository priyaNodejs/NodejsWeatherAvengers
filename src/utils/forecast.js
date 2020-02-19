const request = require('request')
const forecast = (lat, lon , callback) => {
    url = 'https://api.darksky.net/forecast/9c9cb17f982bd1ee74d76bb7ff1058ea/'+lat+','+lon+'?units=si'
    request({url , json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }else if(body.error){
            callback('Url error', undefined)
        }else{
            callback(undefined, {
                latitude: body.latitude,
                longitude: body.longitude
            })
        }
    })
}
module.exports = forecast