import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Station } from '../types';
import StationInfo from './StationInfo'
import {
    Pagination, Button, PageNum, Table, TBody, Th, Tr
} from '../styles/styles'
import Spinner from '../utils/Spinner'

const Stations:React.FC = () =>{
    const [stations, setStations] = useState<Station[]>([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState<number>()
    const [stationsOnPage, setStationsOnPage] = useState<Station[]>([])
    const [searchName, setSearchName] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [foundStation, setFoundStation] = useState<Station>()
    const [isLoading, setIsLoading] = useState(false)

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
            setIsLoading(true)
            const response = await axios.get('http://localhost:3001/api/stations')
            setStations(response.data)
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

    const searchForName = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(searchName){
            try{
                setIsLoading(true)
                const response = await axios.get('http://localhost:3001/api/station/name' +  `/${searchName}`)
                console.log(response.data)
                setIsSearch(true)
                setFoundStation(response.data)
                setSearchName("")
                setIsLoading(false)
            }catch (error){
                console.log(error)
                setIsLoading(false)
                setIsSearch(false)
            }
        }else{
            getStations()
            setIsSearch(false)
            setIsLoading(false)
        }
    }

    const handleChangeSearchName = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchName(event.currentTarget.value)
    }

    return(
        <>
            <h2>Asemat</h2>
            {stationsOnPage && !isLoading?
                <div>
                    <form onSubmit={searchForName}>
                        <input 
                            placeholder="Hae asemaa nimellä"
                            value={searchName}
                            onChange={handleChangeSearchName}
                        />
                        <Button type="submit">Hae</Button>
                    </form>
                    {isSearch&&foundStation?
                        <Table>
                            <TBody>
                                <Tr>
                                    <Th>Tunnus</Th>
                                    <Th>Nimi</Th>
                                    <Th>Osoite</Th>
                                </Tr>
                                <StationInfo 
                                    key={1}
                                    station={foundStation}
                                />
                            </TBody>
                        </Table>
                    :<>
                        <Table>
                            <TBody>
                                <Tr>
                                    <Th>Tunnus</Th>
                                    <Th>Nimi</Th>
                                    <Th>Osoite</Th>
                                </Tr>
                                {stationsOnPage.map((station, index)=>
                                    <StationInfo 
                                        key={index}
                                        station={station}
                                    />
                                )}
                            </TBody>
                        </Table>
                        <Pagination>
                            <Button onClick={changePageBack}>&lt;</Button>
                                <PageNum>{page}</PageNum>
                            <Button onClick={changePageForth}>&gt;</Button>
                        </Pagination>
                    </>}       
                </div>
            :
            <Spinner/>}
        </>
    )
}
    
export default Stations;