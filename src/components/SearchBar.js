import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const SearchBar = () => {
    let navigate = useNavigate();

    const [selectedFilter, setSelectedFilter] = useState('');

    const handleRadioChange = (e) => {
        setSelectedFilter(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let storeNameKeyword = e.target.storeNameKeyword.value;
        navigate(`/search/${storeNameKeyword}`);
    };

    return (
        <form id="search-form" onSubmit={onSubmit}>
            <div>
                <div>
                    {/* <input type="hidden" id="storename" name="filter" value="storename" /> */}
                    <input type="text" className='form-control' name="storeNameKeyword" placeholder='Search...' required />
                </div>
            </div>
            <button id='search-submit-button' type="submit" className='btn btn-light'>Search</button>

        </form>
    )
}

export default SearchBar;