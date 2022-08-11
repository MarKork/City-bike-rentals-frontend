import React from 'react';
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { Station } from '../types';
import {
    Container
} from '../styles/styles'
import Spinner from '../utils/Spinner'

const StationView:React.FC = () => {
    const {id} =useParams()
    const [station, setStation] = useState<Station>()
    const [departureStations, setDepartureStations] = useState<number>(0)
    const [returnStations, setReturnStations] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect (() => {
        getStationInfo()
    }, [])

    useEffect(() =>{
        getDepartureStations()
        getReturnStations()
    },[station])

    const getStationInfo = async() => {
        try{
            setIsLoading(true)
            const response = await axios.get('http://localhost:3001/api/stations' +  `/${id}`)
            setStation(response.data)
            setIsLoading(false)
        }catch (error){
            console.log(error)
        }
    }
    
    const getDepartureStations = async() => {
        if(station){
            try{
                setIsLoading(true)
                const response = await axios.get('http://localhost:3001/api/rentals' +  `/${station.id}`)
                setDepartureStations(response.data.length)
                setIsLoading(false)
            }catch (error){
                console.log(error)
            }
        }
    }

    const getReturnStations = async() => {
        if(station){
            try{
                setIsLoading(true)
                const response = await axios.get('http://localhost:3001/api/rentals/returns' +  `/${station.id}`)
                setReturnStations(response.data.length)
                setIsLoading(false)
            }catch (error){
                console.log(error)
            }
        }
    }

    return(
        <Container>
            {station && !isLoading?
                <div>
                    <h2>{station.name}</h2>
                    <p>{station.address}</p>
                    <p>Asemalta alkoi matkoja {departureStations} kpl</p>
                    <p>Asemalle päättyi matkoja {returnStations} kpl</p>
                </div>
            :
            <Spinner/>
            }
        </Container>
    )
}

export default StationView