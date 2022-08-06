import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { BikeRental } from '../types';
import Rental from './Rental'
import {
    Pagination, Button, Container, PageNum
} from '../styles/styles'

const BikeRentals = () =>{
    const [bikeRentals, setBikeRentals] = useState<BikeRental[]>([])
    const [page, setPage] = useState(1)
    const [rentalsOnPage, setRentalsOnPage] = useState<BikeRental[]>([])

    useEffect (() => {
        getRentals()
    }, [])

    useEffect (() => {
        setRentalsOnPage(bikeRentals.slice(0,5))
    }, [bikeRentals])

    useEffect (() => {
        if(page==0){
            setPage(1)
        }
        if(page==5){
            setPage(4)
        }
        const last = page*5
        const first = last - 5
        setRentalsOnPage(bikeRentals.slice(first,last))
    }, [page])

    const getRentals = async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/rentals')
            setBikeRentals(response.data)
        }catch (error){
            console.log(error)
        }
    }

    const changePageBack = () => {
        setPage(page-1)
    }

    const changePageForth = () => {
        setPage(page+1)
    }

    return(
        <Container>
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
                            {rentalsOnPage.map((rental, index)=>
                                <Rental 
                                    key={index}
                                    rental={rental}
                                />
                            )}
                        </tbody>
                    </table>
                    <Pagination>
                        <Button onClick={changePageBack}>&lt;</Button>
                            <PageNum>{page}</PageNum>
                        <Button onClick={changePageForth}>&gt;</Button>
                    </Pagination>
                </div>
            :""}
        </Container>
    )
}
    
export default BikeRentals;
