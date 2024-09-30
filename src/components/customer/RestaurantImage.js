import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './RestaurantImage.css';

function RestaurantImg({ id, name, description, location, contact }) {

    const navigate = useNavigate();

    const [restaurantImage, setRestaurantImage] = useState();

    useEffect(() => {
        (async () => {
            const resp = await fetch(`http://localhost:8088/image/restaurant/res/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            setRestaurantImage(url);
        })();
    }, [id]);

    return (
        <div className="ui card m-5" key={id}>
            <div className="image" onClick={() => navigate(`/restaurant/${id}`)} style={{}}>
                <img src={restaurantImage} alt="restaurant" className="restaurantPhoto" style={{ height:"193px", objectFit: "cover" }} />
            </div>
            <div className="content text-center">
                <div className="aligned header">
                    <h3 style={{ font: "30px bold" }}>{name}</h3>
                </div>
                <div className="aligned description">
                    <p>{description}</p>
                </div>
            </div>
            <div className="content d-flex" style={{ justifyContent: "space-evenly" }}>
                <div className=" aligned author">
                    <p style={{ fontSize: "10px" }}>Location : <span> {location}</span></p>
                </div>
                <div className=" aligned author">
                    <p style={{ fontSize: "10px" }}>Contact : <span>{contact}</span></p>
                </div>
            </div>
            {/* <div className="m-3">
                                <Link to={`/restaurant/${r.id}`} className="ui button mini yellow">View</Link>
                            </div> */}
        </div>
    )
}

export default RestaurantImg;