import React, { useState } from 'react'
import { useNavigate, useHistory } from 'react-router-dom'
const SearchBar = () => {
    let navigate = useNavigate();
    
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleRadioChange = (e) => {
        // document.getElementById("search-form").reset();
        // document.getElementById("anjing").attributes["required"] = ""; 
        setSelectedFilter(e.target.value);
        console.log("radio")
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const filter = e.target.filter.value;
        const carNameKeyword = e.target.carNameKeyword.value;
        const modelKeyword = e.target.modelKeyword.value;
        const makeYearKeyword = e.target.makeYearKeyword.value;
        const price = e.target.carNameKeyword.value;
        const min = e.target.min.value;
        const max = e.target.max.value;

        if (filter == "carname") {
            console.log(`car name: ${filter} ${carNameKeyword}`)
            navigate(`/search/by/carname/q/${carNameKeyword}`);
            // navigate(`/`);
        } else if (filter == "model") {
            navigate(`/search/by/model/q/${modelKeyword}`);
        } else if (filter == "makeyear") {
            navigate(`/search/by/makeyear/q/${makeYearKeyword}`);
        } else if (filter == "price") {
            if (min != '' && max == '') {
                navigate(`/search/by/price/min/${min}`);
            } else if (min == '' && max != '') {
                navigate(`/search/by/price/max/${max}`);
            } else if (min != '' && max != '') {
                navigate(`/search/by/price/min/${min}/max/${max}`);
            }
        }

        // navigate("/search/by/price/min/:min");
        // navigate("/search/by/price/max/:max");
        // navigate("/search/by/price/min/:min/max/:max");
    };

    return (
        <form id="search-form" onSubmit={onSubmit}>
            <div>
                <input type="radio" id="carname" name="filter" value="carname" onChange={handleRadioChange} />
                <label htmlFor="carname">Car Name</label>
                <input type="text" name="carNameKeyword" required={selectedFilter === 'carname'}/>
            </div>
            <div>
                <input type="radio" id="model" name="filter" value="model" onChange={handleRadioChange} />
                <label htmlFor="model">Model</label>
                <input type="text" id="anjing" name="modelKeyword" required={selectedFilter === 'model'}/>
            </div>
            <div>
                <input type="radio" id="makeyear" name="filter" value="makeyear" onChange={handleRadioChange} />
                <label htmlFor="makeyear">Make Year</label>
                <input type="text" name="makeYearKeyword" required={selectedFilter === 'makeyear'}/>
            </div>
            <div>
                <input type="radio" id="price" name="filter" value="price" onChange={handleRadioChange} />
                <label htmlFor="price">Price</label>
                <input type="numnber" name="min" />
                <input type="numnber" name="max" />
            </div>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;