const inquire = require("inquirer")
const fs = require("fs");

const axios = require("axios");

// let term = process.argv[2];
// let search = process.argv.slice(3).join(" ");
// //review .join(), .split();
// console.log(term);
// console.log(search);

const movies = function(movie) {
	// console.log(movie)


  this.findMovie = function(movies) {
    let URL = "http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=d68adf2e";

  axios.get(URL).then(function(response) {
    let jsonData = response.data;

// create string for movie data (use .join)
    let movieData = [
  
       "Title: " + jsonData.Title,
       "Year: " + jsonData.Year,
       "IMDB: " + jsonData.Ratings[0].Value,
       "Rotten Tomatos: " + jsonData.Ratings[1].Value,
       "Country: " + jsonData.Country,
       "Language: " + jsonData.Language,
       "Plot: " + jsonData.Plot,
       "Actors: " + jsonData.Actors,
      ].join("\n\n");
	  console.log(movieData)
// append file to text log then console.log moviedata
//   fs.appendFile("log.txt", movieData, function(err) {
//      if (err) throw err;
// //       console.log(movieData);
//       });
    });
  }
};

inquire.prompt([
	{
		name: "movieSearch",
		message: "Which movie would you like to look up?",
	}
]).then(function (answer){
	const movie = answer.movieSearch;
	console.log(movie);

	const newConstructor = new movies()
	if (movie === "") {
		newConstructor.findMovie("Eraserhead");
	} else {
		newConstructor.findMovie(movie)
	}
})