import React from 'react';
import { Station } from '../types';
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {
     Td, Tr, StationLink
} from '../styles/styles'

const StationInfo = ({station}:{station:Station}) => {


    return (
        <Tr>
            <Td>
                {station.id.toString()}  
            </Td>
            <Td>
                <StationLink to={`/stations/${station.id}`} key={station.id.toString()}>{station.name}</StationLink>
            </Td>
            <Td>
                {station.address}  
            </Td>
        </Tr>
    )
}

export default StationInfo