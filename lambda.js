import https from "https"

export const handler = async(event) => {
    var html = "unknown";
    let lat = event["params"]["querystring"]['lat'];
    let long = event["params"]["querystring"]['long'];
      
    var apiUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + ',' + long + '&key=f773bcf25836426b95d328a4dcbead3f';

    let dataString = '';
    let data = [];
  
    const response = await new Promise((resolve, reject) => {
        const req = https.get(apiUrl, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
              const results = JSON.parse(dataString);
   
              html = "https://poc-dhs.s3.us-east-2.amazonaws.com/" + results.results[0].components.state_code + "_form01.html";
    
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });

    });

    return html;
};
    