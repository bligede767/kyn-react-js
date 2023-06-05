import { Link } from "react-router-dom";

const Content = (props) => {
    return (
        <article className="content" key={props.storeId}>
            <div className="content-img"></div>
            <Link to={`/viewStore/${props.storeId}`}>
                <div className="content-img-hover">
                    <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-122620,resizemode-1,msid-75214721/industry/services/retail/future-group-negotiates-rents-for-its-1700-stores.jpg" />
                </div>
            </Link>
            <div className="content-info">
                <span className="content-category">{props.model} - {props.country}</span>
                <h3 className="content-title">{props.storeName}</h3>
                <span className="phone">{props.phone.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </span>
            </div>
        </article>
    )
}

export default Content;