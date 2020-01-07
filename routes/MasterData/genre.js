const rp = require('request-promise');
const url = process.env.IMDP_URL;
const api = process.env.API_KEY;

module.exports.getGenre =  async () => {
    try {
      // build request options
      const options = {
        method: 'GET',
        url: url +'/3/genre/movie/list?',
        json: true,
        headers:
           {
             Connection: 'keep-alive',
             Accept: 'application/json',
             'x-api-key':api
            },
         qs: {
            api_key:api,
            language:'en-US'
        }
      };
     console.log(options)
     return await rp(options, function (error, response, body) {
         console.log(error)
         if (error) throw new Error(error);
         return(body);
    });
    } catch (err) {
     
      throw (err.error);
    }
  };
