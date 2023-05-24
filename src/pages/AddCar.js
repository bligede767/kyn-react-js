import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    await axios.post("http://localhost:2323/rest/saveCar", car);
    navigate("/");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type={"text"}
        className="form-control"
        placeholder="Enter car name 2"
        name="carName"
        value={carName}
        onChange={(e) => onInputChange(e)} required />
      <input
        type={"text"}
        className="form-control"
        placeholder="Enter model"
        name="model"
        value={model}
        onChange={(e) => onInputChange(e)} required />
      <input
        type={"text"}
        className="form-control"
        placeholder="Enter make year"
        name="makeYear"
        value={makeYear}
        onChange={(e) => onInputChange(e)} required />
      <input
        type={"text"}
        className="form-control"
        placeholder="Enter price"
        name="price"
        value={price}
        onChange={(e) => onInputChange(e)} required />

      <button type='submit'>Submit</button>
    </form>
  )
}
