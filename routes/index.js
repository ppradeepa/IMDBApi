const router = require("express").Router();
const dotenvStatus = require("dotenv").config();
const movie = require("./MasterData/genre");
const filterData = require("./Movies/PlayList");
const api = process.env.API_KEY;

/**Master Data to get the genre Data **/

router.get("/genre/v1", async (req, res) => {
  try {
    const results = await movie.getGenre();
    const status = 200;
    res.status(status).send(results);
  } catch (err) {
    const status = 400;
    const errorObj = Object.create(null);
    errorObj.error = err;
    res.status(status).send(errorObj.error);
  }
});



/* Load Images List with the filtered data */
router.get("/movieList/v1", async (req, res) => {
  try {
    var rate = req.body.rating;
    var genre_id = req.body.genre_id ;
    let movieSearchResults = await movieSearch();
    res.json({
        combinedResults:movieSearchResults
    });
  } catch (e) {
    res.json({
      combinedResults: []
    });
  }
});



async function movieSearch(rating,genre_id) {
    let searchObj = {
      api_key: api,
      language: "en-US",
      page: 1
    };
    let movieResults = [];
    let movieResultsArr = [];
    return new Promise(async resolve => {
      try {
        var nextMaxId = undefined;
        let movieSearchResults = undefined;
        movieSearchResults = await filterData.getMoviesList(searchObj);
        movieSearchResults = JSON.parse(movieSearchResults);
        if (movieSearchResults.results.length > 0) {
          movieResultsArr = movieResultsArr.concat(movieSearchResults);
          nextMaxId = movieSearchResults.total_pages;
        }
        if (nextMaxId) {
          for (var i = 2; i < nextMaxId-1; i++) {
            searchObj.page = i;
            movieSearchResults = await filterData.getMoviesList(searchObj);
            movieSearchResults = JSON.parse(movieSearchResults);
            if (movieSearchResults.results.length > 0) {
              movieResultsArr = movieResultsArr.concat(movieSearchResults);
            }
          }
        }
        if (movieResultsArr && movieResultsArr.length > 0) {
          for (var i=0;i< movieResultsArr.length-1;i++){
             movieResultsArr.sort(function (a, b) {
             return b.popularity - a.popularity
              
          });
          }

          
        //    movieResultsArr.map(function(data){
        //      return data.map((result)=>{
        //       if(result.vote_average >= rating){
        //          return result
        //         }
        //       });
             
        //   });
            movieResults.push(movieResultsArr);
          }
        
        resolve(movieResults);
      } catch (e) {
        console.log("err", e);
        resolve({
          movieResults: movieResults,
          nextMaxId: undefined
        });
      }
    });
  }

/* Yet To Complete */
// router.post("/movieListImages/v1", async (req, res) => {
//     try {
//       var imagePath = req.body.imagePath;
//       let movieImages = await getImages(imagePath);
//       res.json({
//         movieImages:movieSearchResults
//       });
//     } catch (e) {
//       res.json({
//         combinedResults: []
//       });
//     }
//   });


module.exports = router;
