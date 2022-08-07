import React from 'react';
import { Station } from '../types';
import { useState, useEffect } from 'react'

const StationInfo = ({station}:{station:Station}) => {


    return (
        <tr>
            <td>
                {station.id.toString()}  
            </td>
            <td>
                {station.name}  
            </td>
            <td>
                {station.address}  
            </td>
        </tr>
    )
}

export default StationInfo