import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WeatherFirst from './weatherFirst';
import WeatherEach from './weatherEach';
import swal from 'sweetalert';

import * as weatherAct from './store/actions';



function WeatherMain(props) {

    //getWeather
    
    const dispatch = useDispatch();
    const [click, setClick] = useState();
    const [city, setCity] = useState("");
    let prev_date = "";   

   

    const weather = useSelector( weather  => weather.weathers);   

    const submitForm=(e)=>{
        e.preventDefault();
        if(city!=""){
            let param = "q="+city;
            dispatch(weatherAct.getWeather(param));
        } else {
            swal({
                title: "Warning",
                text: "Please enter your city to check the weather.",
                icon: "warning"
                
              })
        }
    }    
   
    return (
        <div className="w-full max-w-xl md:mx-auto lg:mx-auto my-4">  
             
             <div className="w-full max-w-md md:mx-auto" >
                <form noValidate className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <div className="px-4 pb-4">
                    <label htmlFor="city" className="text-sm block font-bold  pb-2">Check Weather </label>
                    <input type="text" 
                        name="city" 
                        id="" 
                        onChange={e=>setCity(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Enter city name"/>
                    </div>
                
                    <div className="px-4 pb-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={e=>submitForm(e)}    
                    >
                        Search
                    </button>
                    </div>
                </form>
                </div>
             <br/>  
             {/* Click: {click}          */}
             {
                 click && weather.data!=undefined
                 ?
                 <WeatherFirst pointed={click} aData={weather.data.list.find(item=>item.dt==click)}                     
                    displayTxt={ {'city': weather.data.city.name, 'country': weather.data.city.country }}/>
                 :
                 weather.data!=undefined
                 ?
                 <WeatherFirst pointed={click} aData={weather.data.list[0]} 
                 displayTxt={ {'city': weather.data.city.name, 'country': weather.data.city.country }}                 
                 />
                 :
                 ""
             }

             {
             weather.data!=undefined
             ?
             weather.data.list.map(ind=>{
                 let dates_arr = ind.dt_txt.split(" ");                
                 let current_date = dates_arr[0];
                 
                 if(prev_date=="" || prev_date!==current_date){
                    prev_date = current_date;
                    return <WeatherEach data={ind} key={ind.dt} setClick={setClick}
                            displayTxt={ {'city': weather.data.city.name, 'country': weather.data.city.country }}
                            />
                 }
                 
             })
             
             :
             ""

             }
            

             


        </div>
    )
}

export default WeatherMain;
