import React from 'react';
import { BikeRental } from '../types';
import { useState, useEffect } from 'react'
import {
    Tr, Td
} from '../styles/styles'

const Rental = ({rental}:{rental:BikeRental}) => {
    const [distance, setDistance] = useState("0")
    const [duration, setDuration] = useState("0")

    useEffect (() => {
        setDistanceInKilometers()
        setDurationInMinutes()
    }, [rental])

    const setDistanceInKilometers = () => {
        let value=rental.distance.valueOf()
        let distanceAsKilometers:number=value/1000
        setDistance(distanceAsKilometers.toFixed(0))
    }

    const setDurationInMinutes = () => {
        let value = rental.duration.valueOf()
        let inMinutes = Math.floor(value % 3600/60).toString()
        setDuration(inMinutes)
    }

    return (
        <Tr>
            <Td>
                {rental.departureStationName}  
            </Td>
            <Td>
                {rental.returnStationName}  
            </Td>
            <Td>
                {distance}  
            </Td>
            <Td>
                {duration}  
            </Td>
        </Tr>
    )
}

export default Rental