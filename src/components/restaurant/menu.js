import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu({ id, name, price }) {

    const [foodImage, setFoodImage] = useState();

    useEffect(() => {
        (async () => {
            const resp = await fetch(`http://localhost:8088/image/food/fd/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            setFoodImage(url);
        })();
    },[])

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>
                <img src={foodImage} width="90px" alt="item" />
            </td>
            <td>{name}</td>
            <td>Rs. {price}</td>
            <td style={{ width: "10rem" }}>
                <div className="ui small blue basic icon buttons mr-3">
                    <Link className="mini ui button" to={`/restaurant/menu/edit/${id}`}>
                        <i className="edit icon"></i>
                    </Link>
                </div>
                <div className="ui small red basic icon buttons">
                    <Link to={`/restaurant/menu/delete/${id}`} className="mini ui button">
                        <i className="trash icon"></i>
                    </Link>
                </div>
            </td>
        </tr>
    )
}
export default Menu;