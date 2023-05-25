import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <article class="card">
            <div class="card-img"></div>
            <Link to={`/viewCar/${props.carId}`}>
                <div class="card-img-hover">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSzzSdgmbRh3Qn5YA38kqWBJldE72089T-Q&usqp=CAU" />
                </div>
            </Link>
            <div class="card-info">
                <span class="card-category">{props.model} - {props.makeYear}</span>
                <h3 class="card-title">{props.carName}</h3>
                <span class="price">Rp {props.price}
                </span>
            </div>
        </article>
    )
}

export default Card;