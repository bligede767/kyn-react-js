import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <article className="card">
            <div className="card-img"></div>
            <Link to={`/viewCar/${props.carId}`}>
                <div className="card-img-hover">
                    <img src="https://cdn.idntimes.com/content-images/post/20220315/red-tesla-model-3-fefc48e4a17a6fa56e5c6470c5173f35_600x400.jpg" />
                </div>
            </Link>
            <div className="card-info">
                <span className="card-category">{props.model} - {props.makeYear}</span>
                <h3 className="card-title">{props.carName}</h3>
                <span className="price">{props.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </span>
            </div>
        </article>
    )
}

export default Card;