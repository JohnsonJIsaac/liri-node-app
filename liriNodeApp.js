//required apis and tech
require("dotenv").config();
const request = require("request");
const Spotify = require("./spotify");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const spotify = new Spotify(keys.spotify);

//acquires parameters and input from the user
const input = process.argv[2];
const inputParameter = "";

for(const i = 3; i < process.argv.length; i++){
	inputParam += " " + process.argv[i];
};

//creating movie constructor
if (command === "movie-this") {
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (name === "") {
        name = "Mr. Nobody";
    }

   // Then run a request to the OMDB API with the movie specified
   var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

   // This line is just to help us debug against the actual URL.
   // console.log(queryUrl);

   request.get(queryUrl, function(error, response, body) {
       
       // console.log(response);
         if (!error && response.statusCode === 200) {
             //var body = JSON.parse(body);
             for (i = 0; i < JSON.parse(body).Ratings.length; i++) {
                 if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                     tomatoesRating = JSON.parse(body).Ratings[i].Value;
                     // console.log(tomatoesRating);
                 }
                 if (JSON.parse(body).Ratings[i].Source === "Internet Movie Database") {
                     internetRating = JSON.parse(body).Ratings[i].Value;
                     // console.log(internetRating);
                 }
             }
             // Display Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, Country where the movie was produced, Language of the movie, Plot of the movie, Actors in the movie.
             var myMovie =
             "-----------------------------------------------------------------------" + "\r\n" +
           "Movie Title: " + JSON.parse(body).Title + "\r\n" +
           "Year movie released: " + JSON.parse(body).Year + "\r\n" +
           "Movie rating: " + JSON.parse(body).Rated + "\r\n" + 
           "Rotten Tomatoes Rating: " + tomatoesRating + "\r\n" +
           "Internet Movie Database Rating: " + internetRating + "\r\n" +
           "Country: " + JSON.parse(body).Country + "\r\n" + 
           "Language: " + JSON.parse(body).Language + "\r\n" + 
           "Movie Plot: " + JSON.parse(body).Plot + "\r\n" +
            "-----------------------------------------------------------------------" + "\r\n"
           console.log(myMovie);
           writeToLog(myMovie);

         }
   });

}