
const request = require ('request')

const forecast = (latitude , longtitude , callback ) => {

  const url = "http://api.weatherstack.com/current?access_key=f7ea221422539dbc2fdeb7b081efcee9&query=" + latitude + "," + longtitude
  
  request ({url, json : true} , (error , response) => {
       
      if(error) {
           callback ("Unable to connect weather service" , undefined)
      } else if(response.body.error){
           callback (response.body.error.message , undefined)
      } else {
              callback (undefined , "Current weather is " + response.body.current.weather_descriptions[0] + " and Temperature is " + response.body.current.temperature)
      }
  })
  }

module.exports = forecast;