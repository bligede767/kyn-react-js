import React, { Component } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import useProfile from '../../util/UserInfo';

const Profile = (props) => {
    const { profile } = useProfile();
    const { data } = props;
    const { authenticated, currentUser } = data;
    console.log(data)
    const navigate = useNavigate();
    if (authenticated) {
        return (
            <div>
                <div className='heading d-flex'>
                    <h1>User Profile</h1>
                    <Link to={"/profile/update"} >Edit</Link>
                </div>
                <div className='profile-bg' >
                    <div className="profile-content text-white ">

                        <div className="user-detail text-white d-flex">
                            <img src="https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png"
                                alt="" style={{ width: "200px" }} />
                            <div className="information">
                                <h3>{profile?.name}</h3>
                                <div>👤 Username: {profile?.username}</div>
                                <div>✉️ Email: {profile?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        navigate("/login")
    }
}

export default Profile