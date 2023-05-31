import React, { Component } from 'react';
import './Profile.css';
import { Navigate } from 'react-router-dom';

const Profile = (props) => {
    const { data } = props;
    const { authenticated, currentUser } = data;

    if (authenticated) {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                currentUser?.imageUrl ? (
                                    <img src={data.currentUser.imageUrl} alt={currentUser?.name} />
                                ) : (
                                    <div className="text-avatar">
                                        <span>{currentUser?.name && currentUser?.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                            <h2>{currentUser?.name}</h2>
                            <p className="profile-email">{currentUser?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Navigate to={'/login'} />
    }
}

export default Profile