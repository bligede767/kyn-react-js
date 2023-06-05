import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <article className="card" key={props.storeId}>
            <div className="card-img"></div>
            <Link to={`/viewStore/${props.storeId}`}>
                <div className="card-img-hover">
                    <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-122620,resizemode-1,msid-75214721/industry/services/retail/future-group-negotiates-rents-for-its-1700-stores.jpg" />
                </div>
            </Link>
            <div className="card-info">
                <h3 className="card-title">{props.storeName}</h3>
                <div className="phone">🏙 {props.city}</div>
                <div className="phone">🌎 {props.country}</div>
                <div className="phone">📞 {props.phone}</div>
            </div>
        </article>
    )
}

export default Card;