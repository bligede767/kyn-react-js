import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Content from '../components/Content'

import { ACCESS_TOKEN } from '../constants';
import { API_BASE_URL } from '../constants';

export default function SearchStores() {
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);

    const { filter, q, min, max } = useParams();

    useEffect(() => {
        console.log("search store works")
        loadSearchedStores();
    }, [filter, q, min, max])

    const loadSearchedStores = async () => {
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
        let result = await axios.get(`${API_BASE_URL}/store/stores`, headers);
        const keyword = encodeURI(q);
        if (filter === "storename") {
            console.log(`search by storename: ${q}`);
            result = await axios.get(`${API_BASE_URL}/store/search?by=storeName&keyword=${q}`, headers)
        }
        else if (filter === "city") {
            console.log(`search by city: ${q}`);
            result = await axios.get(`${API_BASE_URL}/store/search?by=city&keyword=${q}`, headers)
        }
        else if (filter === "makeyear") {
            console.log(`search by make year: ${q}`);
            result = await axios.get(`${API_BASE_URL}/store/search?by=country&year=${q}`, headers)
        }
        else if (filter === "phone") {
            console.log(`search by phone: min: ${min} max: ${max}`);
            if (min != null && max == null) {
                result = await axios.get(`${API_BASE_URL}/store/search?by=phone&min=${min}`, headers)
            } else if (min == null && max != null) {
                result = await axios.get(`${API_BASE_URL}/store/search?by=phone&max=${max}`, headers)
            } else if (min !== null && max !== null) {
                result = await axios.get(`${API_BASE_URL}/store/search?by=phone&min=${min}&max=${max}`, headers)
            }
        }
        console.log(result.data);
        setStores(result.data);
    }

    return (
        <div>
            <div className="heading">
                <Link className='btn btn-dark' to="/">« Go to home</Link>
                <h1>Search Result</h1>
            </div>
            <div className='contents'>
                {
                    stores.map((store, index) => (
                        <Content storeId={store.id} storeName={store.storeName} city={store.city} country={store.country} phone={store.phone} />
                    ))
                }
            </div>
        </div>
    )
}
