import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarRestaurant from "./navbar";

//not used

function RestaurantCollectedOrder() {


    const [collectedOrder, setCollectedOrder] = useState([]);

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8088/order/collected/true")
                .then(resp => {
                    setCollectedOrder(resp.data);
                })
                .catch(error => {

                });
        })();
    }, []);

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>

            <div className="container">
                <div className="heading m-3">
                    <h1>Collected Orders</h1>
                </div>
            </div>

            <div className="container">
                {
                    collectedOrder.length > 0 ?
                        (
                            <div className="">
                                <table className="ui table yellow text-center disabled">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Customer Id</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            collectedOrder.map(o =>
                                                <tr key={o.id}>
                                                    <td>{o.id}</td>
                                                    <td>{o.quantity}</td>
                                                    <td>{o.price}</td>
                                                    <td>{o.customerId}</td>
                                                    <td>{o.status}</td>
                                                    <td style={{ width: "10rem" }}>
                                                        <Link to={collectedOrder == null ? `/delivery/orderdetails/${o.id}` : ""} className="mini ui primary right labeled icon button">
                                                            <i className="right arrow icon"></i>
                                                            Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) :
                        (
                            <div className="ui red message container">
                                No Orders Yet
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default RestaurantCollectedOrder;