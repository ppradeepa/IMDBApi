const rp = require('request-promise');
const url = process.env.IMDP_URL;
const api = process.env.API_KEY;

module.exports.getMoviesList =  async (searchObj) => {
   try {
       var myRequest = {
        method: 'GET',
        uri: url +'/3/movie/now_playing?',
        headers:
           { Connection: 'keep-alive',
            Accept: 'application/json',
            
          },
          qs:searchObj

       };
    return await rp(myRequest, function (error, response, body) {
        if (error) throw new Error(error);
        return(body);
       });
   
}
    catch (err) {
        throw (err.error);
      }
}


/** For Filter Genre Data */
// module.exports.search =  async (nameKey, data) => {

//   var arr = [];
//        for (var z = 0; z < nameKey.length; z++) {
//            console.log("ini",nameKey.length);
//            console.log(data.results.length)
//          for (var i = 0; i < data.results.length; i++) {
//            console.log("asd",nameKey[z]);
//            console.log(data.results[i].genre_ids);
//             if (data.results[i].genre_ids.indexOf(nameKey[z]) > 0) {
//                  arr.push({title:data.results[i]});
//            }
//          }
//        }
//        console.log(arr)
//        return arr;
// }
// module.exports.getImages =  async (imgPath) => {
//    try {
//        var myRequest = {
//         method: 'GET',
//         uri: url +'/3/movie/now_playing?',
//         headers:
//            { Connection: 'keep-alive',
//             Accept: 'application/json',
            
//           },
//           qs:{
//             imgPath
//           }

//        };
//     return await rp(myRequest, function (error, response, body) {
//         console.log(error)
//         if (error) throw new Error(error);
//         return(body);
//        });
   
// }
//     catch (err) {
 
//         throw (err.error);
//       }
// }

