import React, { Component } from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import WeatherIcon from 'react-icons-weather'
const moment = require('moment')

class CurrentDayDetail extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        {this.props.dailyWeather.map((day, index) => {
                            return (
                                <Col sm={6} md={3} key={day.time}>
                                    <WeatherIcon
                                        name='darksky'
                                        iconId={day.icon}
                                        flip='horizontal'
                                        rotate='90'
                                    />
                                    <br />
                                    <label>{moment.unix(day.time).format('dddd')}</label>
                                    <br />
                                    {Math.round(day.apparentTemperatureLow)} - {Math.round(day.apparentTemperatureHigh)}°F.
                                    <br /> 
                                    {day.summary}
                                </Col>
                            )
                        })}
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default CurrentDayDetail