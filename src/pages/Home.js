import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Link, useParams } from "react-router-dom";
// import { MyContext } from "./MyContext";


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
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Car Name</th>
                        <th>Model</th>
                        <th>Make Year</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map((car, index) => (

                            <tr>
                                <td scope="row" key={car.id}>{car.id}</td>
                                <td>{car.carName}</td>
                                <td>{car.model}</td>
                                <td>{car.makeYear}</td>
                                <td>{car.price}</td>
                                <Link to={`rest/viewCar?cid=${car.id}`}>View</Link>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
