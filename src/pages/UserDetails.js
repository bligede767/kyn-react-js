import React, { useEffect, useState } from 'react';
// import './Profile.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import { API_BASE_URL } from '../constants';
import useProfile from '../util/UserInfo';
import Card from '../components/Card';

const UserDetails = () => {
    const { profile } = useProfile();
    const navigate = useNavigate();

    const [stores, setStores] = useState([]);

    const [user, setUser] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, [id]);

    const loadUser = async () => {
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
        const userDetailData = await axios.get(`${API_BASE_URL}/user/details/${id}`, headers);
        const userStore = await axios.get(`${API_BASE_URL}/store/owner?uId=${id}`, headers);
        setUser(userDetailData.data);
        setStores(userStore.data)
    }
    console.log(user.stores);
    return (
        <div>
            <div className='heading d-flex'>
                <h1>User Details</h1>
                {profile?.role === 'ROLE_ADMIN' ?
                    <Link to={`/admin/update-user/${user.id}`} >Edit</Link>
                    : <></>
                }
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
                            <div>📱 Phone: {user.phone}</div>
                            <div>🏙 City: {user.city}</div>
                            <div>🌎 Country: {user.country}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cards' style={{ marginTop: "40px" }}>
                {
                    stores.map((store, index) => (
                        <Card key={index} storeId={store.id} storeName={store.storeName} city={store.city} country={store.country} phone={store.phone} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserDetails;