const request = require("request");


const GeoCode = (address, callback) => {

    const GeoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibW9oYW1lZDExOTciLCJhIjoiY2ttZXA5aGc5MHk0NTJ3a2gxa3I4NnU3eSJ9.4UjUhnI-a9hx3yQOkkSS4g&limit=1";

    request({ url: GeoUrl, json: true }, (error, { body } = {}) => {

        if (error) {
            callback("Can not Connect to network!", undefined);
        } else if (body.message == "Not Found" ||
            body.features.length == 0) {

            callback("The Location is not Found!", undefined);
        } else {

            callback(undefined, {
                longitude: body.features[0].center[0],
                Latitude: body.features[0].center[1],
                Place_name: body.features[0].place_name
            });
        }

    });
};

module.exports = GeoCode;