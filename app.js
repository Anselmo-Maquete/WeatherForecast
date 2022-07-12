const express = require("express");
const res = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));




    var queryDefault = "Maputo";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+queryDefault+"&appid=136468bec2b205083c3c491f452c0290&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function (data){
            
            const weatherData = JSON.parse(data);
            
            const lction = weatherData.name;
            const temperature = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            if(response.statusCode===200){
                var temp = Math.round(temperature); 

                var finalDesc = weatherDes[0].toUpperCase() + weatherDes.substring(1);
            }

            //Time and Date
            let dateObj = new Date();
            let currentHour = dateObj.getHours();
            let greeting = "";

            if(currentHour>= 12 && currentHour<=17){
                 greeting = "Good afternoon";
            }else if(currentHour>= 18 && currentHour<=5){
                 greeting = "Good evenning";
            }else{
                 greeting = "Good Morning";
            }
            
            app.get("/", function(req, res){

                res.render("index", {greetingMsg: greeting, iconUrl: imgUrl, location: lction, tempOfDay: temp, descrptOfDay: finalDesc});

            });
        })


    });

//Formulario -- Pesquisa
    // app.post("/", function(req, res){
    //     let pesquisaLcl = req.body.pesquisaLocal;

    //     if(pesquisaLcl.length >= 3){

    //         const url = "https://api.openweathermap.org/data/2.5/weather?q="+pesquisaLcl+"&appid=136468bec2b205083c3c491f452c0290&units=metric";

    //         https.get(url, function(response){
    //             console.log(response.statusCode);
        
    //             response.on("data", function (data){
                    
    //                 const weatherData = JSON.parse(data);
                    
    //                 const lction = weatherData.name;
    //                 const temp = weatherData.main.temp;
    //                 const weatherDes = weatherData.weather[0].description;
    //                 const icon = weatherData.weather[0].icon;
        
    //                 const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
    //                 //Time and Date
    //                 let dateObj = new Date();
    //                 let currentHour = dateObj.getHours();
    //                 let greeting = "";
        
    //                 if(currentHour>= 12 && currentHour<=17){
    //                      greeting = "Good afternoon";
    //                 }else if(currentHour>= 18 && currentHour<=5){
    //                      greeting = "Good evenning";
    //                 }else{
    //                      greeting = "Good Morning";
    //                 }
                    
    //                 app.get("/", function(req, res){
        
    //                     res.render("index", {greetingMsg: greeting, iconUrl: imgUrl, location: lction, tempOfDay: temp, descrptOfDay: weatherDes});
        
    //                 });
    //             })
        
        
    //         });
    //     }

    // });


app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});












//<i class="fas fa-cloud-sun"></i>
//Open Weathe API Key 136468bec2b205083c3c491f452c0290