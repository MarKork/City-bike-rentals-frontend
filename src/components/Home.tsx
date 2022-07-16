import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import BikeRentals from './BikeRentals'
import {Link} from 'react-router-dom'

const Home = () =>{
    const [isDataFetched, setIsDataFetched] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/api/total')
          .then(res=> {
            if(res.data["count"]===0){
                setIsDataFetched(false)
                getData()
            }else setIsDataFetched(true)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getData = async () =>{
        const {data} =await axios.get(`https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv`)
        parseCSV(data)
    }

    const parseCSV = (text:string) => {
        const lines = text.split('\n');
        const output:Array<any> = [];
        let i:number=0
      
        lines.forEach(line => {
            const columns = line.split(',');
            //data validation here:
            if(Number(columns[6])>10&&Number(columns[7])>10&&i<3){
                columns[7]=columns[7].replace("\r", "")
                output.push(columns);
                addOneRental(columns)
            }
            i++
        });

        setIsDataFetched(true)
    };

    const addOneRental = async (rentalInfo:Array<any>) => {
        await axios
            .post('/api/rentals', rentalInfo)
            .catch(err => {
                console.log("Tallennus ei onnistunut.")
            })
    }

    return(
        isDataFetched?
            <div>
                <p>Valitse näkymä:</p>
                <Link to="/bikerentals">Pyörävuokrat</Link> <Link to="/stations">Asemat</Link>
            </div>
        :
        <p>Odota hetki, tietoa ladataan.</p>
    )
}
    
export default Home;