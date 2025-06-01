import React, { useState } from 'react'
import './WeaterApp.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/clound.png'
import drizzle_icon from '../assets/drizzle.avif'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.jpg'
import wind_icon  from '../assets/wind.png'
import humidity from '../assets/humidity.png'

function WeatherApp() {


   let  [wIcon,setWIcon]=useState(clear_icon)
  
    let api_key='c3eff91f5ec115b2c5761c29a8dc5a6d'
    const serach= async()=>{
        const element=document.getElementsByClassName("cityInput")
        if (element.length === 0 || element[0].value === "") {
            return 0;
        }
       
            let url= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
            let response= await fetch(url)
            let data= await response.json()
          
        
            
            const humidity= document.getElementsByClassName('humidity-percent')
           const wind= document.getElementsByClassName('wind-rate')
           const temperature = document.getElementsByClassName('weather-temp');
           const location = document.getElementsByClassName('weather-location');
           
           if (data?.main?.humidity !== undefined) {
            humidity[0].innerHTML = data.main.humidity + "%";
          }
      
          if (data?.wind?.speed !== undefined) {
            wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
          }
      
          if (data?.main?.temp !== undefined) {
            temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
          }
      
          if (data?.name !== undefined) {
            location[0].innerHTML = data.name;
          }
     
       if(data?.weather[0]?.icon==='01d' || data?.weather[0]?.icon==='01n')
{
    setWIcon(clear_icon)
}
else if(data?.weather[0]?.icon==='02d' || data?.weather[0]?.icon==='02n')
{
    setWIcon(cloud_icon)
}
else if(data?.weather[0]?.icon==='03d' || data?.weather[0]?.icon==='03n')
{
    setWIcon(drizzle_icon)
}

else if(data?.weather[0]?.icon==='09d' || data?.weather[0]?.icon==='09n')
{
    setWIcon(rain_icon)
} 

else if(data?.weather[0]?.icon==='10d' || data?.weather[0]?.icon==='10n')
{
    setWIcon(rain_icon)
}
else if(data?.weather[0]?.icon==='13d' || data?.weather[0]?.icon==='13n')
{
    setWIcon(snow_icon)
}
else{
    setWIcon(clear_icon)
}
    }
  return (
    
    <div className='container'>
       
        <div className='top-bar'>

            <input type='text' className='cityInput' placeholder='Search City'/>
            <div className='serach-icon' onClick={serach}>
<img alt='search'  src={search_icon} />
            </div>

        </div>
        <div className='weather-image'>
            <img src={wIcon} alt=''/>
        </div>




<div className='weather-temp'>
     24°C
        </div>
        <div className='weather-location'>
  Loya
        </div>
        <div className='data-container'>
            <div className='element'>
<img   src={humidity} alt='' className='icon' />
<div className='data'>
    <div className='humidity-percent'>64%</div>
    <div className='text'>Humidity</div>
</div>
            </div>


            <div className='element'>
<img   src={wind_icon} alt='' className='icon' />
<div className='data'>
    <div className='wind-rate'>18 km/h</div>
    <div className='text'>wind Speed</div>
</div>
            </div>
        </div>



      



        
    </div>
    
  )
}

export default WeatherApp
