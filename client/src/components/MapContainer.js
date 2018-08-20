import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import fetchJsonp from 'fetch-jsonp'
import request from 'superagent'
import WeatherDetails from './WeatherDetails'
import Geocode from 'react-geocode'
require('es6-promise').polyfill()

Geocode.setApiKey('AIzaSyDSCJ4vf8bi2yi13XIk4yF9r3S_FTuxI_4')

Geocode.enableDebug()

export class MapContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            darkSkyData: null,
            geocode: "",
            markers: [
                {
                    position: {lat: null, lng: null}
                }
            ]
        }

        this.onMapClicked = this.onMapClicked.bind(this)
    }

    onMapClicked(mapProps, map, clickEvent) {

        const lat = `${clickEvent.latLng.lat()}`
        const lng = `${clickEvent.latLng.lng()}`

        const data = {
            lat: lat,
            lng: lng
        }

        this.setState(previousState => {
            return {
                markers: [
                    ...previousState.markers, {
                        position: {lat, lng}
                    }
                ]
            }
        })

        // Get address from lat-long
        Geocode.fromLatLng(lat, lng)
            .then(response => {
                const address = response.results[2].formatted_address
                this.setState({ geocode: address })
            },
            error => {
                console.error(error)
            }
        )

        request
            .post('/api/locations')
            .set({
                Accept: 'application/json'
            })
            .send(data)
            .end((err, res) => {
                if (err) {
                    console.log(`error: ${err}`)
                }
            })

        fetchJsonp(`https://api.darksky.net/forecast/e6601973c3dcbfa83f0a38899ca18b01/${lat},${lng}`)
            .then(function (response) {
                return response.json()
            }).then((json) => {
                this.setState({ darkSkyData: json })
            }).catch(function (ex) {
                console.log(`parsing failed`, ex)
            })
    }

    render() {
        const style = {
            width: '75vw',
            height: '80vh',
            position: 'relative',
        }

        return (
            <div className="map-container">
                <Map
                    className="map"
                    google={this.props.google}
                    zoom={11}
                    style={style}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: 38.0293,
                        lng: -78.4767
                    }}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position} />
                    ))}
                </Map>
                {this.state.darkSkyData && this.state.geocode ? <WeatherDetails {...this.state} /> : null}
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDSCJ4vf8bi2yi13XIk4yF9r3S_FTuxI_4'
})(MapContainer)