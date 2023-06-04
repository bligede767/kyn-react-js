import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
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
    const result = await axios.get("http://localhost:8080/admin/users", headers)
    setUsers(result.data);
  }

  const deleteUser = async (id) => {
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
    await axios.delete(`http://localhost:8080/admin/delete/${id}`, headers);
    loadUsers();
  }
  const confirmDelete = (id, name) => {
    const isConfirm = window.confirm(`Are you sure you want to delete this user: ${name}?`);
    if (isConfirm) {
      deleteUser(id);
    }

  }

  return (
    <div>
      <div className='heading'>
        <h1>User Management</h1>
      </div>
      <div className='cards'>
        <table id="example" className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Provider</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.provider}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className='d-flex'>
                      <button className='btn btn-light mx-2'><Link>View</Link></button>

                      {
                        user.role == 'ROLE_USER' ?
                          <div className='d-flex'>
                            <button className='btn btn-light mx-2'><Link>Edit</Link></button>
                            <button className='btn btn-danger mx-2' onClick={() => confirmDelete(user.id, user.name)}>Delete</button>
                          </div> : <></>
                      }
                    </div>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}
