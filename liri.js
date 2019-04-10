require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var inputString = process.argv;
var operand = inputString[2];
var name = inputString[3];

function cramThatName() {
    name = ""
    for (var i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
            name = name + " " + inputString[i];
        } else {
            name += inputString[i];
        }
    }
}
cramThatName();
liri(operand, name);

function liri(operand, name) {

    // movie-this

    if (operand === "movie-this") {
        axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // Then we print out the imdbRating
                console.log("The title is: " + response.data.Title);
                console.log(name + " was released in " + response.data.Year);
                console.log("IMDB rated " + name + "a " + response.data.imdbRating);
                console.log("Rotten Tomatoes rated " + name + " a " + response.data.Metascore);
                console.log(name + " was made in " + response.data.Country);
                console.log(name + " is in " + response.data.Language);
                console.log("The plot is: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            });
    }

    // concert-this

    else if (operand === "concert-this") {
        axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
            function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    console.log(name + " is coming to " +
                        response.data[i].venue.name + " in " +
                        response.data[i].venue.city + ", " +
                        response.data[i].venue.region + " on " +
                        moment(response.data[i].datetime).format("dddd, MMMM Do YYYY"));
                }
            });
    }

    // spotify-this

    else if (operand === "spotify-this-song") {
        if (name === "") {
            name = "The Sign";
        }
        spotify.search({ type: 'track', query: name }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song title: " + data.tracks.items[0].name);
            console.log("Preview the song at: " + data.tracks.items[0].preview_url);
            console.log("This song is on the album: " + data.tracks.items[0].album.name);
        });
    }

    // do-what-it-says

    else if (operand === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(",");
            liri(dataArr[0], dataArr[1]);
        });
    }
}