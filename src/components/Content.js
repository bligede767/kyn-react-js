import { Link } from "react-router-dom";

const Content = (props) => {
    return (
        <article className="content">
            <div className="content-img"></div>
            <Link to={`/viewStore/${props.storeId}`}>
                <div className="content-img-hover">
                    <img src="https://cdn.idntimes.com/content-images/post/20220315/red-tesla-model-3-fefc48e4a17a6fa56e5c6470c5173f35_600x400.jpg" />
                </div>
            </Link>
            <div className="content-info">
                <span className="content-category">{props.model} - {props.makeYear}</span>
                <h3 className="content-title">{props.storeName}</h3>
                <span className="price">{props.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </span>
            </div>
        </article>
    )
}

export default Content;