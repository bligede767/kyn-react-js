import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

export default function CarManagement() {
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
    const result = await axios.get(`${API_BASE_URL}/car/cars`, headers)
    setCars(result.data);
  }

  const deleteCar = async (id) => {
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
    await axios.delete(`${API_BASE_URL}/admin/delete-car/${id}`, headers);
    loadCars();
  }
  const confirmDelete = (id, name) => {
    const isConfirm = window.confirm(`Are you sure you want to delete this car: ${name}?`);
    if (isConfirm) {
      deleteCar(id);
    }

  }
  return (
    <div>
      <div className='heading'>
        <h1>Car Management</h1>
      </div>
      <div className='cards'>
        <table id="example" className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Car Name</th>
              <th>Model</th>
              <th>Make Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              cars.map((car, index) => (
                <tr key={index}>
                  <td>{car.id}</td>
                  <td>{car.carName}</td>
                  <td>{car.model}</td>
                  <td>{car.makeYear}</td>
                  <td>{car.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                  <td>
                    <div className='d-flex'>
                      <Link to={`/viewCar/${car.id}`} className='btn btn-light mx-2'>👁 View</Link>
                      <Link to={`/admin/update-car/${car.id}`} className='btn btn-light mx-2'>✏️ Edit</Link>
                      <button className='btn btn-danger mx-2' onClick={() => confirmDelete(car.id, car.carName)}>🗑 Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
