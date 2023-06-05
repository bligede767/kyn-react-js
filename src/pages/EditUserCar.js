import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

import { ACCESS_TOKEN } from '../constants';
import { API_BASE_URL } from '../constants';
export default function EditUserCar() {
    let navigate = useNavigate();

    const [car, setCar] = useState({
        carName: "",
        model: "",
        makeYear: "",
        price: ""
    });

    const { carName, model, makeYear, price } = car;

    const onInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            navigate('/login')
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        };
        await axios.put(`${API_BASE_URL}/admin/update-car/${cid}`, car, headers);
        navigate("/admin/cars");
    };

    const { cid } = useParams();

    useEffect(() => {
        loadUserDetail();
    }, [cid]);

    const loadUserDetail = async () => {
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
        const result = await axios.get(`${API_BASE_URL}/car/viewCar?cid=${cid}`, headers);
        setCar(result.data);
    }


    return (
        <div>
            <div className='heading'>
                <h1>Update Car</h1>
                <h2>ID: {cid} | {carName}</h2>
                <Link to={"/admin/users"} className='btn btn-dark'>❌ Cancel</Link>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="row g-3">
                <div className="col-md-12">
                    <label for="carName" className="form-label">Car Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter car name"
                        name="carName"
                        value={carName}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-md-12">
                    <label for="model" className="form-label">Model</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter model"
                        name="model"
                        value={model}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-md-12">
                    <label for="makeYear" className="form-label">Make Year</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter make year"
                        name="makeYear"
                        value={makeYear}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-md-12">
                    <label for="price" className="form-label">Price</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter price"
                        name="price"
                        value={price}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-12">
                    <button type='submit' className='btn btn-primary' >Save changes</button>
                </div>
            </form>
        </div>
    )
}
