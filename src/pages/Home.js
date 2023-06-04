import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { MyContext } from "./MyContext";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card'

import { ACCESS_TOKEN } from '../constants';


export default function Home() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        // Check token
        if (!token) {
            navigate('/login')
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        };
        const result = await axios.get("http://localhost:8080/car/cars", headers)
        setCars(result.data);
    }
    return (
        <div>
            <div className='heading'>
                <h1>Car List</h1>
                <Link to={"/addcar"} className='btn btn-dark'>+ Add a car</Link>
            </div>
            <div className='cards'>
                {
                    cars.map((car, index) => (
                        <Card key={index} carId={car.id} carName={car.carName} model={car.model} makeYear={car.makeYear} price={car.price} />
                    ))
                }
            </div>
        </div>
    )
}
