import React, { useEffect, useState } from 'react';
// import './Profile.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import { API_BASE_URL } from '../constants';

const UserDetails = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadCar();
    }, [id]);

    const loadCar = async () => {
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
        const result = await axios.get(`${API_BASE_URL}/user/details/${id}`, headers);
        setUser(result.data);
    }
    return (
        <div>
            <div className='heading d-flex'>
                <h1>User Details</h1>
                <Link to={`/admin/update-user/${user.id}`} >Edit</Link>
            </div>
            <div className='profile-bg' >
                <div className="profile-content text-white ">

                    <div className="user-detail text-white d-flex">
                        <img src="https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png"
                            alt="" style={{ width: "200px" }} />
                        <div className="information">
                            <h3>{user.name}</h3>
                            <div>👤 Username: {user.username}</div>
                            <div>✉️ Email: {user.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;