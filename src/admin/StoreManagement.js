import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

export default function StoreManagement() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
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
    const result = await axios.get(`${API_BASE_URL}/store/stores`, headers)
    setStores(result.data);
  }

  const deleteStore = async (id) => {
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
    await axios.delete(`${API_BASE_URL}/admin/delete-store/${id}`, headers);
    loadStores();
  }
  const confirmDelete = (id, name) => {
    const isConfirm = window.confirm(`Are you sure you want to delete this store: ${name}?`);
    if (isConfirm) {
      deleteStore(id);
    }

  }
  return (
    <div>
      <div className='heading'>
        <h1>Store Management</h1>
      </div>
      <div className='contents'>
        <table id="example" className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Store Name</th>
              <th>Model</th>
              <th>Make Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              stores.map((store, index) => (
                <tr key={index}>
                  <td>{store.id}</td>
                  <td>{store.storeName}</td>
                  <td>{store.model}</td>
                  <td>{store.makeYear}</td>
                  <td>{store.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                  <td>
                    <div className='d-flex'>
                      <Link to={`/viewStore/${store.id}`} className='btn btn-light mx-2'>👁 View</Link>
                      <Link to={`/admin/update-store/${store.id}`} className='btn btn-light mx-2'>✏️ Edit</Link>
                      <button className='btn btn-danger mx-2' onClick={() => confirmDelete(store.id, store.storeName)}>🗑 Delete</button>
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
