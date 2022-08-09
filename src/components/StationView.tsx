import React from 'react';
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { Station } from '../types';

const StationView = () => {
    const {id} =useParams()
    const [station, setStation] = useState<Station>()
    const [departureStations, setDepartureStations] = useState<number>(0)
    const [returnStations, setReturnStations] = useState<number>(0)

    useEffect (() => {
        getStationInfo()
    }, [])

    useEffect(() =>{
        getDepartureStations()
        getReturnStations()
    },[station])

    const getStationInfo = async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/stations' +  `/${id}`)
            setStation(response.data)
        }catch (error){
            console.log(error)
        }
    }
    
    const getDepartureStations = async() => {
        if(station){
            try{
                const response = await axios.get('http://localhost:3001/api/rentals' +  `/${station.id}`)
                setDepartureStations(response.data.length)
            }catch (error){
                console.log(error)
            }
        }
    }

    const getReturnStations = async() => {
        if(station){
            try{
                const response = await axios.get('http://localhost:3001/api/rentals/returns' +  `/${station.id}`)
                setReturnStations(response.data.length)
            }catch (error){
                console.log(error)
            }
        }
    }

    return(
        <div>
            <Link to="/stations">takaisin</Link>
            <h2>Aseman tiedot</h2>
            {station?
                <div>
                    <p>Aseman nimi: {station.name}</p>
                    <p>Aseman osoite: {station.address}</p>
                    <p>Asemalta alkoi matkoja {departureStations} kpl</p>
                    <p>Asemalle päättyi matkoja {returnStations} kpl</p>
                </div>
            :<p>Odota hetki</p>
            }
            
        </div>
    )
}

export default StationView