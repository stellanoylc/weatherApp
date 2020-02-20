const apiUrl = "http://api.openweathermap.org/data/2.5/forecast";
    
// const apiHeader = {    
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
//     "Access-Control-Allow-Headers": ["Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Accept", "Content-Type", "X-Amz-Date", "Authorization", "x-api-key", "X-Amz-Security-Token", "Access-Control-Allow-Credentials"],
//     "Access-Control-Allow-Credentials": true,
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     // "Authorization": "Bearer " + temp
// }

class Api {   
    static send(method, params) {  
        let api_url =  apiUrl + "?" + params + "&APPID=cc894fec1de3321e1b5d083a118c0afe";

        return fetch(api_url,
            {
                method: method,
                // headers: apiHeader,
                // body: JSON.stringify(params)
            }
        )
            .then((response) => {
                
                return response.json();
            })
            .then((rslt) => {
                if (rslt.cod != 200) {
                    return false;
                } else {
                    
                    return rslt;
                }
            })
            .catch((err) => {
                throw err;
            })
    }


    static post(params) {       
        return this.send("POST", params).then(rslt2 => {                    
            return rslt2;
        })   
    }

}

export default Api;
