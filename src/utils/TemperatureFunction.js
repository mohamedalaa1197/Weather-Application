const request = require("request")


const weatherFun = (longitude, Latitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=e4a55eafb29e25832c042fafe963d586&query=" + longitude + "," + Latitude + "&units=m"

    request({ url: url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback("Ther is no network Connection!", undefined);
        } else if (body.sucess === false) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                Temperature: body.current.temperature,
                Humidity: body.current.humidity,
                visibility: body.current.visibility
            });

        }
    })

};

module.exports = weatherFun;