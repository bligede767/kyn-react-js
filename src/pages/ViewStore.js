import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ACCESS_TOKEN } from '../constants';
import { API_BASE_URL } from '../constants';
import useProfile from '../util/UserInfo';

export default function ViewStore() {
    const { token, profile } = useProfile();
    const navigate = useNavigate();
    const [store, setStore] = useState({
        storeName: "",
        model: "",
        makeYear: "",
        price: "",
    });

    const { cid } = useParams();

    useEffect(() => {
        loadStore();
    }, [cid]);

    const loadStore = async () => {
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
        const result = await axios.get(`${API_BASE_URL}/store/viewStore?cid=${cid}`, headers);
        setStore(result.data);
    }
    console.log(store.user)
    return (
        <div>
            <div className="heading d-flex">
                <h1>Store Detail</h1>
                {profile?.role === 'ROLE_ADMIN' ?
                    <Link to={`/admin/update-store/${store.id}`} >Edit</Link>
                    : <></>
                }
            </div>
            <div className='row'>
                <div className='col-6'>
                    <img className='store-detail-img' src='https://cdn.idntimes.com/content-images/post/20220315/red-tesla-model-3-fefc48e4a17a6fa56e5c6470c5173f35_600x400.jpg' />
                </div>
                <div className='col-6'>
                    <h1>{store.storeName}</h1>
                    <div>{store.model} - {store.makeYear}</div>
                    <div className='content-detail-price'>{store.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit est quis mi sollicitudin, id accumsan magna euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam a massa sodales enim tempus pretium id nec leo. In hac habitasse platea dictumst. Sed eget accumsan libero, id blandit metus.
                    </p>
                </div>
            </div>
        </div>
    )
}
