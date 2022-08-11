import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Stations from './Stations'
import {
    Container
} from '../styles/styles'
import Spinner from '../utils/Spinner'
 
const StationsMain:React.FC = () =>{
    const [isStationsDataFetched, setIsStationsDataFetched] = useState(false)

    useEffect (() => {
        getStationsCount()
    }, [])

    const getStationsCount = () => {
        axios.get('http://localhost:3001/api/totalstations')
          .then(res=> {
            if(res.data["count"]===0){
                setIsStationsDataFetched(false)
                getStationsData()
            }else setIsStationsDataFetched(true)
        })
    }

    const getStationsData = async () =>{
        const {data} =await axios.get(`https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv`)
        parseStationsCSV(data)
    }

    const parseStationsCSV = async (text:string) => {
        const lines = text.split('\n');
        lines.shift()
        lines.pop()
        const output:Array<any> = [];
        let i:number=0
      
        lines.forEach(async(line) => {
            const columns = line.split(',')

            if(columns.length==15){
                let address1=columns[5]
                let address2=columns[6]
                let address3=address1.concat(", ", address2)
                let address3New = address3.replace(/"/gi, "")
                columns[5]=address3New
                let city=columns[9]
                columns[7]=city
                let capacity=columns[12]
                columns[10]=capacity
            }
            if(columns.length==16){
                let name1=columns[2]
                let name2=columns[3]
                let name3=name1.concat(", ", name2)
                let nameNew = name3.replace(/"/gi, "")
                columns[2]=nameNew
                let address=columns[8]
                columns[5]=address
                let city=columns[10]
                columns[7]=city
                let capacity=columns[13]
                columns[10]=capacity
            }
            if(i<100){
                output.push(columns);
            }
            i++
        });
        addStations(output)
    };

    const addStations = async (stationsData:Array<any>) => {
        for (const station of stationsData){ 
            try{
                const response = await axios
                    .post('/api/stations', station)
                    setIsStationsDataFetched(true)
            }catch(err){
                console.log(err)
            }
        }
    }

    return(
        <Container>
            {isStationsDataFetched?
                <Stations/>
            :
            <Spinner/>}
        </Container>
    )
}
    
export default StationsMain;