import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function SearchCars() {
    const [cars, setCars] = useState([]);

    const { filter, q, min, max } = useParams();

    useEffect(() => {
        console.log("search car works")
        loadSearchedCars();
    }, [])

    const loadSearchedCars = async () => {
        let result = await axios.get("http://localhost:2323/rest/cars");
        const keyword = encodeURI(q);
        if (filter === "carname") {
            console.log(`search by carname: ${q}`);
            result = await axios.get(`http://localhost:2323/rest/search?by=carName&keyword=${q}`)
        }
        else if (filter === "model") {
            console.log(`search by model: ${q}`);
            result = await axios.get(`http://localhost:2323/rest/search?by=model&keyword=${q}`)
        }
        else if (filter === "makeyear") {
            console.log(`search by make year: ${q}`);
            result = await axios.get(`http://localhost:2323/rest/search?by=makeYear&keyword=${q}`)
        }
        else if (filter === "price") {
            console.log(`search by price: min: ${min} max: ${max}`);
            if (min != null && max == null) {
                result = await axios.get(`http://localhost:2323/rest/search?by=price&min=${min}`)
            }
            else if (min === null && max != null) {
                result = await axios.get(`http://localhost:2323/rest/search?by=price&max=${max}`)
            }
            result = await axios.get(`http://localhost:2323/rest/search?by=price&min=${min}&max=${max}`)
        }
        console.log(result.data);
        setCars(result.data);
    }



    return (
        <div>SearchCars</div>
    )
}
