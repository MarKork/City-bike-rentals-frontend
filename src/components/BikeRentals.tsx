import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { BikeRental } from '../types';
import Rental from './Rental'

const BikeRentals = () =>{
    const [bikeRentals, setBikeRentals] = useState<BikeRental[]>([])

    useEffect (() => {
        getRentals()
    }, [])

    const getRentals = async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/rentals')
            setBikeRentals(response.data)
        }catch (error){
            console.log(error)
        }
    }

    return(
        <div>
            <div>
                <Link to="/">takaisin</Link>
            </div>
            {bikeRentals?
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Lähtöasema</th>
                                <th>Saapumisasema</th>
                                <th>Matka</th>
                                <th>Aika</th>
                            </tr>
                            {bikeRentals.map((rental, index)=>
                                <Rental 
                                    key={index}
                                    rental={rental}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            :""}
        </div>
    )
}
    
export default BikeRentals;
