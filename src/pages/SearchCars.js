import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card'
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../constants';

export default function SearchCars() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    const { filter, q, min, max } = useParams();

    useEffect(() => {
        console.log("search car works")
        loadSearchedCars();
    }, [filter, q, min, max])

    const loadSearchedCars = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            Alert.error('You must login before submit')
            navigate('/login')
            return;
        }
        
        const headers = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        };
        let result = await axios.get("http://localhost:8080/car/cars", headers);
        const keyword = encodeURI(q);
        if (filter === "carname") {
            console.log(`search by carname: ${q}`);
            result = await axios.get(`http://localhost:8080/car/search?by=carName&keyword=${q}`, headers)
        }
        else if (filter === "model") {
            console.log(`search by model: ${q}`);
            result = await axios.get(`http://localhost:8080/car/search?by=model&keyword=${q}`, headers)
        }
        else if (filter === "makeyear") {
            console.log(`search by make year: ${q}`);
            result = await axios.get(`http://localhost:8080/car/search?by=makeYear&keyword=${q}`, headers)
        }
        else if (filter === "price") {
            console.log(`search by price: min: ${min} max: ${max}`);
            if (min != null && max == null) {
                result = await axios.get(`http://localhost:8080/car/search?by=price&min=${min}`, headers)
            } else if (min == null && max != null) {
                result = await axios.get(`http://localhost:8080/car/search?by=price&max=${max}`, headers)
            } else if (min !== null && max !== null) {
                result = await axios.get(`http://localhost:8080/car/search?by=price&min=${min}&max=${max}`, headers)
            }
        }
        console.log(result.data);
        setCars(result.data);
    }

    return (
        <div>
            <div className="heading">
                <Link className='btn btn-dark' to="/">« Go to home</Link>
                <h1>Search Result</h1>
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
