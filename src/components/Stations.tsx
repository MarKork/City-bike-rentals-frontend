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
    const [maxPage, setMaxPage] = useState<number>()
    const [stationsOnPage, setStationsOnPage] = useState<Station[]>([])

    useEffect (() => {
        getStations()
    }, [])

    useEffect (() => {
        if(stations){
            const last = page*20
            const first = last - 20
            setStationsOnPage(stations.slice(first,last))
        }
    }, [page])

    useEffect (() => {
        let pagesTotal=stations.length/20;
        let pagesMax = Math.ceil(pagesTotal)
        setMaxPage(pagesMax)
        setStationsOnPage(stations.slice(0,20))
    }, [stations])

    const getStations = async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/stations')
            setStations(response.data)
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
                <h2>Kaupunkipyörien asemat</h2>
            </div>
            {stationsOnPage?
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
            :<p>Odota hetki</p>}
        </Container>
    )
}
    
export default Stations;