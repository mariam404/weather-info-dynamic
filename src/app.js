const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.set('view engine', 'hbs');

      const viewsDirectory = path.join (__dirname , "../template/views" )
      app.set( "views" , viewsDirectory)


      var hbs = require ('hbs')

      const partialsPath = path.join (__dirname , "../template/partials")

      hbs.registerPartials(partialsPath)


      app.get('/' , (req , res) => {
        res.render('index' , {
            title:"Home",
            mainTitle: "Welcome to our Weather Jornal App",
            subTitle: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, pariatur nulla quae earum ab reprehenderit rerum voluptatem eligendi officiis ipsam!"
        })
    })

    

    const geocode = require('./tools/geocode')
    const forecast = require('./tools/forecast')

    app.get('/weather' , (req,res) => {
        if(!req.query.address) {  
          return res.send({
            error : 'you must enter address'
          })
        }
        geocode(req.query.address , (error, data) => {
            if (error) {
              return res.send({error})
            } else {
              forecast(data.latitude , data.longtitude , (error , forecastData) => {
                if (error) {
                  return res.send({error})
                } else {
                  res.send({
                    location : req.query.address,
                    forecast : forecastData , 
                    latitude : data.latitude ,
                    longtitude : data.longtitude ,
                  })
                }
              }) 
            }
          })
        })
        

    app.get('*' , (req , res)=> {
        res.send('404 Page Not Founded')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    