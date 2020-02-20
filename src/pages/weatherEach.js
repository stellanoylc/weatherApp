
import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import {countries} from '../lib/country_code';
import {timezone} from '../lib/timezone';


function WeatherEach(props) {
 
  const ts = new Date(props.data.dt_txt);  
    
    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: 151,
          margin: 'auto',
        },
        '@media (max-width: 400px)':{
          temperature: {
            fontSize: '1em'
          },
          dates: {
            fontSize: '1.3em'
          }
        },
        controls: {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        playIcon: {
          height: 38,
          width: 38,
        },
      }));

    const classes = useStyles();        

    const rearrangeDateFormat=()=>{
            
      let dateTime = changeTime();      
      let arr = dateTime.split(",");
      let dd = arr[0].trim().split(" ");
      //Feb 25, 2020,Tuesday => 20 Feb 2020, Thu
      let displayDate = dd[1]+ " " + dd[0] + ", " + arr[1] + " " + arr[2]; 
     
      return displayDate;
    }    

    const getTimezone=()=>{      
      let obj = {};
      obj = timezone.find(item=>item.code===props.displayTxt.country);
      return obj.timezone;
    }

    const changeTime=()=>{      
      let dateTime = "";
      let country_timezone = getTimezone();
      let day_week="";

      var cutoffString = ts; // in utc
      var utcCutoff = moment.utc(cutoffString, 'YYYYMMDD HH:mm:ss');
      var displayCutoff = utcCutoff.clone().tz(country_timezone);
     
      dateTime = displayCutoff.format('ll');
      day_week = displayCutoff.format('dddd');

      return dateTime +","+day_week;
    }

    const roundUpTemperature=(val)=>{
      return Math.round(val);
    }

    return (
        <div className="w-full max-w-xl md:mx-auto lg:mx-auto my-4">
             
             <Card className={classes.root} onClick={e=>props.setClick(props.data.dt)}>                
                <CardContent className={classes.content}>   
                    <Typography className={classes.dates} component="h5" variant="h5">                    
                    {rearrangeDateFormat()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.data.weather[0].main}
                    </Typography>
                </CardContent>
                <div className={classes.cover}>
                   <Typography className={classes.temperature} component="h6" variant="h6" color="textPrimary" align="center" noWrap={true}>
                    {roundUpTemperature(props.data.main.temp_min)} &#8451; - {roundUpTemperature(props.data.main.temp_max)}&#8451;
                   </Typography>
                
                </div>
            </Card>
        </div>
    )
}



export default WeatherEach;