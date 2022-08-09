import React from 'react';
import { Station } from '../types';
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const StationInfo = ({station}:{station:Station}) => {


    return (
        <tr>
            <td>
                {station.id.toString()}  
            </td>
            <td>
                <Link to={`/stations/${station.id}`} key={station.id.toString()}>{station.name}</Link>
            </td>
            <td>
                {station.address}  
            </td>
        </tr>
    )
}

export default StationInfo