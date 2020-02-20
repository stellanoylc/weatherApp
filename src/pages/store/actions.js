import Api from "../../lib/api";
import swal from 'sweetalert';

export const GET_WEATHER = 'GET_WEATHER';

export const getWeather = (params) =>{

    var succ = false;
    return dispatch => {
        
        let url_param = "";
        url_param = params+ "&units=metric"        
        return Api.post(url_param).then((data) => {
           
            if (data) {
                
                dispatch({
                    "type": GET_WEATHER,
                    "payload": data
                });
                succ = true;
            } else {
                swal({
                    title: "Error",
                    text: "Not found.",
                    icon: "warning"
                    
                  })
            } 
            return succ;
        }).catch(err => {
            console.error(err);
        });
    }
}