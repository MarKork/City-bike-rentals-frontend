import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BikeRental } from '../types';
import Rental from './Rental'
import {
    Pagination, Button, PageNum, Table, TBody, Th, Tr
} from '../styles/styles'
import Spinner from '../utils/Spinner'

const BikeRentals:React.FC = () =>{
    const [bikeRentals, setBikeRentals] = useState<BikeRental[]>([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState<number>()
    const [rentalsOnPage, setRentalsOnPage] = useState<BikeRental[]>([])
    const [isLoading, setIsLoading] = useState(false)

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
            setIsLoading(true)
            const response = await axios.get('http://localhost:3001/api/rentals')
            setBikeRentals(response.data)
            setIsLoading(false)
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
        <>
            <h2>Vuokrausmatkat</h2>
            {rentalsOnPage && !isLoading?
                <div>
                    <Table>
                        <TBody>
                            <Tr>
                                <Th>Lähtöasema</Th>
                                <Th>Saapumisasema</Th>
                                <Th>Km</Th>
                                <Th>Min</Th>
                            </Tr>
                            {rentalsOnPage.map((rental, index)=>
                                <Rental 
                                    key={index}
                                    rental={rental}
                                />
                            )}
                        </TBody>
                    </Table>
                    <Pagination>
                        <Button onClick={changePageBack}>&lt;</Button>
                            <PageNum>{page}</PageNum>
                        <Button onClick={changePageForth}>&gt;</Button>
                    </Pagination>
                </div>
            :
            <Spinner/>               
            }
        </>
    )
}
    
export default BikeRentals;