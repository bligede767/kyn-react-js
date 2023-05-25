import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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

        let carNameKeyword = e.target.carNameKeyword.value;
        let modelKeyword = '';
        let makeYearKeyword = '';
        let price = '';
        let min = '';
        let max = '';

        if (isInSearch) {
            carNameKeyword = e.target.carNameKeyword.value;
            modelKeyword = e.target.modelKeyword.value;
            makeYearKeyword = e.target.makeYearKeyword.value;
            price = e.target.price.value;
            min = e.target.min.value;
            max = e.target.max.value;
        } else {
            carNameKeyword = e.target.carNameKeyword?.value || '';
            modelKeyword = e.target.modelKeyword?.value || '';
            makeYearKeyword = e.target.makeYearKeyword?.value || '';
            price = e.target.carNameKeyword?.value || '';
            min = e.target.min?.value || '';
            max = e.target.max?.value || '';
        }

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
    };

    const isInSearch = useLocation().pathname.includes("/search");

    return (
        <form id="search-form" onSubmit={onSubmit}>
            {!isInSearch ? (
                <div>
                    <div>
                        <input type="hidden" id="carname" name="filter" value="carname" />
                        <input type="text" name="carNameKeyword" placeholder='Search' required />
                    </div>
                </div>) : (

                <div>
                    <div>
                        <input type="radio" id="carname" name="filter" value="carname" onChange={handleRadioChange} />
                        <label htmlFor="carname">Car Name</label>
                        <input type="text" name="carNameKeyword" placeholder='Car Name' required={selectedFilter === 'carname'} />
                    </div>
                    <div>
                        <input type="radio" id="model" name="filter" value="model" onChange={handleRadioChange} />
                        <label htmlFor="model">Model</label>
                        <input type="text" id="anjing" name="modelKeyword" placeholder='Model' required={selectedFilter === 'model'} />
                    </div>
                    <div>
                        <input type="radio" id="makeyear" name="filter" value="makeyear" onChange={handleRadioChange} />
                        <label htmlFor="makeyear">Make Year</label>
                        <input type="text" name="makeYearKeyword" placeholder='Make Year' required={selectedFilter === 'makeyear'} />
                    </div>
                    <div>
                        <input type="radio" id="price" name="filter" value="price" onChange={handleRadioChange} />
                        <label htmlFor="price">Price</label>
                        <input type="number" placeholder='Minimum Price' name="min" />
                        <input type="number" placeholder='Maximum Price' name="max" />
                    </div>
                </div>
            )}
            <button type="submit" className='btn btn-light'>Search</button>

        </form>
    )
}

export default SearchBar;