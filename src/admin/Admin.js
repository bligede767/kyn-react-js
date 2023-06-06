import React, { useEffect } from 'react'
import { API_BASE_URL, ACCESS_TOKEN } from '../constants'
import { Link, useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    const isAdmin = async () => {
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
        fetch(`${API_BASE_URL}/admin`, headers)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 403) {
                        navigate("/forbidden");
                    }
                } else {
                    navigate("/admin/users")
                }
            })
            .catch(error => {
                navigate("/forbidden");
            })
    }
    useEffect(() => {
        console.log("welcome to admin")
        isAdmin();
    }, [])
}
