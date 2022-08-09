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
    const [maxPage, setMaxPage] = useState<number>()
    const [rentalsOnPage, setRentalsOnPage] = useState<BikeRental[]>([])

    useEffect (() => {
        getRentals()
    }, [])

    useEffect (() => {
        if(bikeRentals){
            const last = page*20
            const first = last - 20
            setRentalsOnPage(bikeRentals.slice(first,last))
        }
    }, [page])

    useEffect (() => {
        let pagesTotal=bikeRentals.length/20 
        let pagesMax = Math.ceil(pagesTotal)
        setMaxPage(pagesMax)
        setRentalsOnPage(bikeRentals.slice(0,19))
    }, [bikeRentals])

    const getRentals = async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/rentals')
            setBikeRentals(response.data)
        }catch (error){
            console.log(error)
        }
    }

    const changePageBack = () => {
        if(page-1==0){
            setPage(1)
        }else{
            setPage(page-1)
        }
    }

    const changePageForth = () => {
        if(maxPage){
            if(page+1>maxPage){
                setPage(maxPage)
            }else{
                setPage(page+1)
            }
        }
    }

    return(
        <Container>
            <div>
                <Link to="/">takaisin</Link>
                <h2>Vuokrausmatkat</h2>
            </div>
            {rentalsOnPage?
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
            :<p>Odota hetki</p>}
        </Container>
    )
}
    
export default BikeRentals;
