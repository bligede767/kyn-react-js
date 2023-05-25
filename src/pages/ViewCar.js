import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
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
        setCar(result.data);
    }
    return (
        <div>
            <div className="heading">
                <Link className='btn btn-dark' to="/">« Go to home</Link>
                <h1>Car Detail</h1>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <img className='car-detail-img' src='https://cdn.idntimes.com/content-images/post/20220315/red-tesla-model-3-fefc48e4a17a6fa56e5c6470c5173f35_600x400.jpg' />
                </div>
                <div className='col-6'>
                    <h1>{car.carName}</h1>
                    <div>{car.model} - {car.makeYear}</div>
                    <div className='card-detail-price'>{car.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit est quis mi sollicitudin, id accumsan magna euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam a massa sodales enim tempus pretium id nec leo. In hac habitasse platea dictumst. Sed eget accumsan libero, id blandit metus.
                    </p>
                </div>
            </div>
        </div>
    )
}
