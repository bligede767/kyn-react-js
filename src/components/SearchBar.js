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
        const filter = e.target.filter.value;

        let storeNameKeyword = e.target.storeNameKeyword.value;
        let modelKeyword = '';
        let makeYearKeyword = '';
        let price = '';
        let min = '';
        let max = '';

        if (isInSearch) {
            storeNameKeyword = e.target.storeNameKeyword.value;
            modelKeyword = e.target.modelKeyword.value;
            makeYearKeyword = e.target.makeYearKeyword.value;
            price = e.target.price.value;
            min = e.target.min.value;
            max = e.target.max.value;
        } else {
            storeNameKeyword = e.target.storeNameKeyword?.value || '';
            modelKeyword = e.target.modelKeyword?.value || '';
            makeYearKeyword = e.target.makeYearKeyword?.value || '';
            price = e.target.storeNameKeyword?.value || '';
            min = e.target.min?.value || '';
            max = e.target.max?.value || '';
        }

        if (filter == "storename") {
            console.log(`store name: ${filter} ${storeNameKeyword}`)
            navigate(`/search/by/storename/q/${storeNameKeyword}`);
            // navigate(`/`);
        } else if (filter == "model") {
            navigate(`/search/by/model/q/${modelKeyword}`);
        } else if (filter == "makeyear") {
            navigate(`/search/by/makeyear/year/${makeYearKeyword}`);
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
                        <input type="hidden" id="storename" name="filter" value="storename" />
                        <input type="text" className='form-control' name="storeNameKeyword" placeholder='Search' required />
                    </div>
                </div>) : (

                <div>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" >
                                    Store Name
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <div>
                                        <input type="radio" id="storename" className='radio-input' name="filter" value="storename" onChange={handleRadioChange} />
                                        <label htmlFor="storename">Store Name</label>
                                        <input type="text" name="storeNameKeyword" className='form-control' placeholder='Store Name' required={selectedFilter === 'storename'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" >
                                    Model
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <div>
                                        <input type="radio" id="model" className='radio-input' name="filter" value="model" onChange={handleRadioChange} />
                                        <label htmlFor="model">Model</label>
                                        <input type="text" id="anjing" name="modelKeyword" className='form-control' placeholder='Model' required={selectedFilter === 'model'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree" >
                                    Make Year
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <div>
                                        <input type="radio" id="makeyear" className='radio-input' name="filter" value="makeyear" onChange={handleRadioChange} />
                                        <label htmlFor="makeyear">Make Year</label>
                                        <input type="text" name="makeYearKeyword" className='form-control' placeholder='Make Year' required={selectedFilter === 'makeyear'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour" >
                                    Price
                                </button>
                            </h2>
                            <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <div>
                                        <input type="radio" id="price" className='radio-input' name="filter" value="price" onChange={handleRadioChange} />
                                        <label htmlFor="price">Price</label>
                                        <input type="number" className='form-control' placeholder='Minimum Price' name="min" />
                                        <input type="number" className='form-control' placeholder='Maximum Price' name="max" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button id='search-submit-button' type="submit" className='btn btn-light'>Search</button>

        </form>
    )
}

export default SearchBar;