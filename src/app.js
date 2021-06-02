const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Geocode = require("./utils/geoCodeFunction.js");
const weather = require("./utils/TemperatureFunction.js");
const request = require("request");
const port = process.env.PORT || 3000;

const temlateDir = path.join(__dirname, "../src/Templates/views");

const AbouteDir = path.join(__dirname, "../public");
const weatherDir = path.join(__dirname, "../public");
const partialDir = path.join(__dirname, "../src/Templates/partials");

app.set("view engine", "hbs");
app.set("views", temlateDir);
hbs.registerPartials(partialDir);

app.get("", (request, response) => {
    response.render("index.hbs", {
        title: "Weather",
        name: "Mohamed Alaa"
    });
});

app.get("/about", (request, response) => {
    response.render("about", {
        title: "Aboute",
        name: "Mohamed Alaa",
        Content: "This Weather application was created by Mohamed Alaa.  using API from mapbox and weather stack API"
    });
});

// app.get("/weather", (request, response) => {
//     response.render("weather", {
//         title: "Weather page!",
//         name: "Mohamed Alaa"
//     });
// });

app.use(express.static(AbouteDir));



app.get("/weather", (request, response) => {

    if (!request.query.location) {
        return response.send({
            "error": "You must add location term!"
        })
    }

    Geocode(request.query.location, (error, { Latitude, longitude, Place_name } = {}) => {

        if (error) {
            return response.send({ error })
        }

        weather(longitude, Latitude, (error, { Temperature, Humidity }) => {
            if (error) {
                return response.send(error);
            }


            response.send({
                Temperature,
                Humidity,
                Place_name
            })
        })


    });

})


app.get("/help/*", (request, response) => {
    response.render("404", {
        errormwssage: "The help Data is not Found!",
        name: "Mohamed Alaa"
    });
})

app.get("*", (request, response) => {
    response.render("404", {
        errormwssage: " 404 Page!",
        name: "Mohamed Alaa"
    })
});

app.listen(port, () => {
    console.log("the server has started on port " + port);
});