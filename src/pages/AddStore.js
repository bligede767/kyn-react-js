import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { ACCESS_TOKEN } from '../constants';
import { API_BASE_URL } from '../constants';

export default function SaveStore() {
  let navigate = useNavigate();

  const [store, setStore] = useState({
    storeName: "",
    model: "",
    makeYear: "",
    price: "",
  });

  const { storeName, model, makeYear, price } = store;

  const onInputChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
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
    await axios.post(`${API_BASE_URL}/store/save-store`, store, headers);
    navigate("/");
  };

  return (
    <div>
      <div className='heading'>
        <h1>Add Store</h1>
        <Link to={"/"} className='btn btn-dark'>❌ Cancel</Link>
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="row g-3">
        <div className="col-md-12">
          <label for="storeName" className="form-label">Store Name</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter store name"
            name="storeName"
            value={storeName}
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
          <button type='submit' className='btn btn-primary' >Submit</button>
        </div>
      </form>
    </div>
  )
}
