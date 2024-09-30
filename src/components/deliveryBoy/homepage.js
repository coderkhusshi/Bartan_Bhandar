import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarDeliveryBoy from "./navbar";

function HomePageDelivery() {

    const d = JSON.parse(localStorage.getItem("deliveryboy"));

    const [orders, setOrders] = useState([]);

    const [collectedOrder, setCollectedOrder] = useState({});
    const [collectedOrderErrMsg, setCollectedOrderErrMsg] = useState('');

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8088/order/collected/false")
                .then(resp => {
                    setOrders(resp.data);
                });


            await axios.get(`http://localhost:8088/collectedorder/delivered/not/delivery/${d.id}`)
                .then(resp => {
                    setCollectedOrder(resp.data);
                })
                .catch(error => {
                    setCollectedOrderErrMsg(error.response.data);
                });

        })();
    }, [d.id]);


    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarDeliveryBoy />
            </div>

            <div className="container">
                <div className="heading m-3">
                    <h1>Orders</h1>
                </div>
                <div>
                    {
                        collectedOrderErrMsg &&
                        <div>
                            <div className="ui red mini message">
                                {collectedOrderErrMsg}
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="container">
                {
                    orders.length > 0 ?
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
                                            orders.map(o =>
                                                <tr key={o.id}>
                                                    <td>{o.id}</td>
                                                    <td>{o.quantity}</td>
                                                    <td>{o.price}</td>
                                                    <td>{o.customerId}</td>
                                                    <td>{o.status}</td>
                                                    <td style={{ width: "10rem" }}>
                                                        <Link to={collectedOrder !== null ? `/delivery/orderdetails/${o.id}` : ""} className="mini ui primary right labeled icon button">
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

export default HomePageDelivery;