import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function SaveCar() {
  let navigate = useNavigate();

  const [car, setCar] = useState({
    carName: "",
    model: "",
    makeYear: "",
    price: "",
  });

  const { carName, model, makeYear, price } = car;

  const onInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/rest/saveCar", car);
    navigate("/");
  };

  return (
    <div>
      <div className='heading'>
        <h1>Car List</h1>
        <Link to={"/"} className='btn btn-dark'>❌ Cancel</Link>
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="row g-3">
        <div className="col-md-12">
          <label for="carName" class="form-label">Car Name</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter car name"
            name="carName"
            value={carName}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="model" class="form-label">Model</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter model"
            name="model"
            value={model}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="makeYear" class="form-label">Make Year</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter make year"
            name="makeYear"
            value={makeYear}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="price" class="form-label">Price</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter price"
            name="price"
            value={price}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div class="col-12">
          <button type='submit' className='btn btn-primary' >Submit</button>
        </div>
      </form>
    </div>
  )
}
