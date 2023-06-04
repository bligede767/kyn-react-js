import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

import { ACCESS_TOKEN } from '../constants';
export default function EditProfileModal() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
        await axios.put(`http://localhost:8080/admin/update-user/${id}`, user, headers);
        navigate("/admin/users");
    };

    const { id } = useParams();

    useEffect(() => {
        loadUserDetail();
    }, [id]);

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
        const result = await axios.get(`http://localhost:8080/user/details/${id}`, headers);
        setUser(result.data);
    }


    return (
        <div>
            <div className='heading'>
                <h1>Update Profile</h1>
                <h2>ID: {id} | {name}</h2>
                <Link to={"/admin/users"} className='btn btn-dark'>❌ Cancel</Link>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="row g-3">
                <div className="col-md-12">
                    <label for="name" className="form-label">Fullname</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter fullname"
                        name="name"
                        value={name}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-md-12">
                    <label for="username" className="form-label">Username</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-md-12">
                    <label for="email" className="form-label">Email</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter make year"
                        name="email"
                        value={email}
                        onChange={(e) => onInputChange(e)} required />
                </div>
                <div className="col-12">
                    <button type='submit' className='btn btn-primary' >Save changes</button>
                </div>
            </form>
        </div>
    )
}
