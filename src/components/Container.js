import React, { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'
import axios from 'axios'
import './style.css'

const apikey = "bd5e378503939ddaee76f12ad7a97608";
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast"
const iconUrl = "https://openweathermap.org/img/wn/"

function Container() {    
    const {cities} = useCities()
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState([])
    const currentDays = findDays()
    
    const onChange = (e) => {
        setCity(e.target.value)      
    }

    useEffect(() => {        
        if(city !== ""){
            axios(`${baseUrl}/daily?q=${city}&appid=${apikey}&lang=TR`).then(res => setWeatherData(res.data.list))
        }
    }, [city])

    // useEffect(() => {
    //     console.log(weatherData);
    // }, [weatherData])
    
    return (
        <div className='container'>
            <div className='header'>
			    <h1>Hava Durumu</h1>
            </div>
            <div className='city'>
                <p>Sehir Seçiniz : </p>
                <select name="city" value={city} onChange={onChange}>
                    <option value="" hidden="selected"></option>
                    {
                        cities.map(city => <option key={city.id} value={city.name}>{city.name}</option>)
                    }
                </select>
            </div>            
                 
            <div className='context'>
                <h2>{city}</h2>
                <div className='detail'>
                    {
                        weatherData.map((day, i) => 
                            <div key={i} className='card'>
                                <h3 className='day'>{currentDays[i]}</h3>
                                <img src={`${iconUrl}${day.weather[0].icon}@2x.png`} alt=''/>
                                <div className="content">
                                    <h4>{day.weather[0].description}</h4>
                                    <h3>{Math.floor(day.temp.day - 273.15)}°C</h3>
                                </div>
                            </div>)
                    }
                </div>                    
            </div>           
        </div>
    )
}

function findDays(){
    const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    const newDays = []
    const d = new Date()
    const index = d.getDay()

    for(let i = index - 1; i < days.length; i++){
        newDays.push(days[i])
    }

    for(let i = 0; i < index - 1; i++){
        newDays.push(days[i])
    }

    return newDays
}

export default Container