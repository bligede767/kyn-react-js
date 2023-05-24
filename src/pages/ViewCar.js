import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewCar() {
    const [car, setCar] = useState({
        carName: "",
        model: "",
        makeYear: "",
        price: "",
    });

    const { cid } = useParams();

    useEffect(() => {
        loadCar();
    }, [cid]);

    const loadCar = async () => {
        const result = await axios.get(`http://localhost:2323/rest/viewCar?cid=${cid}`);
        console.log("hello")
        setCar(result.data);
    }
    return (
        <div className='container'>
            <h1>Detail of car: {car.id}</h1>
            <ul>
                <li>Name: {car.carName}</li>
                <li>Name: {car.model}</li>
                <li>Name: {car.makeYear}</li>
                <li>Name: {car.price}</li>
            </ul>
        </div>
    )
}
