import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import BikeRentals from './BikeRentals'
import {
    Container
} from '../styles/styles'
import Spinner from '../utils/Spinner'
 
const BikeRentalsMain:React.FC = () =>{
    const [isRentalsDataFetched, setIsRentalsDataFetched] = useState(false)

    useEffect (() => {
        getRentalsCount()
    }, [])

    const getRentalsCount = () => {
        axios.get('http://localhost:3001/api/total')
          .then(res=> {
            if(res.data["count"]===0){
                setIsRentalsDataFetched(false)
                getRentalsData()
            }else setIsRentalsDataFetched(true)
        })
    }

    const getRentalsData = async () =>{
        const {data} =await axios.get(`https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv`)
        parseRentalsCSV(data)
    }

    const parseRentalsCSV = async (text:string) => {
        const lines = text.split('\n');
        const output:Array<any> = [];
        let i:number=0
      
        lines.forEach(async(line) => {
            const columns = line.split(',');
            //data validation here:
            if(Number(columns[6])>10&&Number(columns[7])>10&&i<200){
                columns[7]=columns[7].replace("\r", "")
                output.push(columns);
            }
            i++
        });
        addRentals(output)
    };

    const addRentals = async (rentalData:Array<any>) => {
        for (const rental of rentalData){ 
            try{
                const response = await axios
                    .post('/api/rentals', rental)
                    setIsRentalsDataFetched(true)
            }catch(err){
                console.log(err)
            }
        }
    }

    return(
        <Container>
            {isRentalsDataFetched?
                <BikeRentals/>
            :
            <Spinner/>}
        </Container>
    )
}
    
export default BikeRentalsMain;