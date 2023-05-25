import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Link, useParams } from "react-router-dom";
// import { MyContext } from "./MyContext";
import Card from '../components/Card'


export default function Home() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        const result = await axios.get("http://localhost:2323/rest/cars")
        setCars(result.data);
    }
    return (
        <div>
            <div className='heading'>
                <h1>Car List</h1>
                <Link to={"/addcar"} className='btn btn-dark'>+ Add car</Link>
            </div>
            <div className='cards'>
                {
                    cars.map((car, index) => (
                        <Card carId={car.id} carName={car.carName} model={car.model} makeYear={car.makeYear} price={car.price} />
                    ))
                }
            </div>
        </div>
    )
}
