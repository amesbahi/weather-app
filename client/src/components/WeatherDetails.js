import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import CurrentDayDetail from './CurrentDayDetail'

const WeatherDetails = (props) => {
    const currentWeather = props.darkSkyData.currently
    const dailyWeather = props.darkSkyData.daily.data
    return (
        <div>
            <Jumbotron>
                <div className="currently">
                    <h2>{props.geocode}</h2>
                    <br />
                    <h4>Current Weather</h4>
                    <ul className='currentWeatherDetails'>
                        <li>{Math.round(currentWeather.apparentTemperature)}°F</li>
                        <li>{currentWeather.summary}</li>
                        <li>Humidity is at {Math.round(currentWeather.humidity * 100)}%</li>
                    </ul>
                </div>
                <div className="daily">
                    <h4>Daily Forecast</h4>
                    <p>{props.darkSkyData.daily.summary}</p>
                    <br />
                    <h4>Weekly Forecast</h4>
                    <CurrentDayDetail dailyWeather={dailyWeather} />
                </div>
            </Jumbotron>
        </div>
    )
}

export default WeatherDetails