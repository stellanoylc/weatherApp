
import React, { useEffect, useState, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import moment from 'moment-timezone/builds/moment-timezone-with-data';
import {countries} from '../lib/country_code';
import {timezone} from '../lib/timezone';

function WeatherFirst(props) {
 
  const ts = props.aData.dt_txt;
    
    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          backgroundColor:"#dee5ef;"
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
            fontSize: '2em'
          },
          place: {
            fontSize: '1em'
          },
          dates: {
            fontSize: '0.9em'
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
      //Thu, Feb 20, 2020 11:00 AM
      let dd= arr[1].trim().split(" ");     

      let displayDate = arr[0]+ ", " + dd[1] + " "+ dd[0] + " " + arr[2];  

      return displayDate;
    }

    const roundUpTemperature=(val)=>{
      return Math.round(val);
    }    

    const getTimezone=()=>{      
      let obj = {};
      obj = timezone.find(item=>item.code===props.displayTxt.country);
      return obj.timezone;
    }

    const changeTime=()=>{      
      let dateTime = "";
      let country_timezone = getTimezone();

      var cutoffString = ts; // in utc
      var utcCutoff = moment.utc(cutoffString, 'YYYYMMDD HH:mm:ss');
      var displayCutoff = utcCutoff.clone().tz(country_timezone);

      // console.log('utcCutoff:', utcCutoff.format('YYYYMMDD hh:mm:ssa Z')); // => utcCutoff: 20170421 04:30:00pm +00:00
      // console.log('displayCutoff:', displayCutoff.format('llll')); // => displayCutoff: 20170421 12:30:00pm -04:00
      dateTime = displayCutoff.format('llll');

      return dateTime;
    }

    const displayCountryName = (val)=>{
      let country =[];
      
      country = countries.filter(item=>item.code==val)
      return country[0].name;
    }

    return (
        <div className="w-full max-w-xl md:mx-auto lg:mx-auto my-4">            
             
             <Card className={classes.root}>
                <div
                    className={classes.cover}
                    // image={image}
                    // title="Live from space album cover"
                >
                    <Typography className={classes.temperature} component="h3" variant="h3" align="center" noWrap={true}> 
                        {roundUpTemperature(props.aData.main.temp)} &#8451;
                    </Typography>
                     
                </div>                 
                <CardContent className={classes.content}>   
                    <Typography className={classes.place} component="h5" variant="h5">                   
                    {props.displayTxt.city + ", " + displayCountryName(props.displayTxt.country)}
                    
                    </Typography>
                    <Typography className={classes.dates} component="h5" variant="h5"> 
                    {rearrangeDateFormat()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.aData.weather[0].main}                        
                    </Typography>
                </CardContent>
                
            </Card>
        </div>
    )
}



export default WeatherFirst;