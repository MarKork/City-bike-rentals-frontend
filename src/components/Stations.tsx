import React from 'react';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Station } from '../types';
import StationInfo from './StationInfo'
import {
    Pagination, Button, Container, PageNum
} from '../styles/styles'

const Stations = () =>{
    const [stations, setStations] = useState<Station[]>([])
    const [page, setPage] = useState(1)
    const [stationsOnPage, setStationsOnPage] = useState<Station[]>([])

    useEffect (() => {
        getStations()
    }, [])

    useEffect (() => {
        setStationsOnPage(stations.slice(0,8))
    }, [stations])

    useEffect (() => {
        if(page==0){
            setPage(1)
        }

        let pagesTotal=stations.length/8 
        let pagesMax = Math.ceil(pagesTotal)

        if(page===pagesMax+1){
            setPage(pagesMax)
        }

        const last = page*8
        const first = last - 8
        setStationsOnPage(stations.slice(first,last))
    }, [page, stations])

    const getStations = async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/stations')
            setStations(response.data)
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
                <h2>Kaupunkipyörien asemat</h2>
            </div>
            {stations?
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Tunnus</th>
                                <th>Nimi</th>
                                <th>Osoite</th>
                            </tr>
                            {stationsOnPage.map((station, index)=>
                                <StationInfo 
                                    key={index}
                                    station={station}
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
    
export default Stations;