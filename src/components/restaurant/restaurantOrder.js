import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarRestaurant from "./navbar";

function RestaurantOrder() {

    const r = JSON.parse(localStorage.getItem("restaurant"));

    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8088/orderdetails/restaurant/" + r.name)
            .then(resp => {
                setOrder(resp.data);
            })
    }, [r.name])

    const AllOrders = () => {
        axios.get(`http://localhost:8088/orderdetails/restaurant/${r.name}`)
            .then(resp => {
                setOrder(resp.data);
            })
    }

    const PendingOrders = () => {
        axios.get(`http://localhost:8088/orderdetails/order/status/restaurant/${r.name}/Pending`)
            .then(resp => {
                setOrder(resp.data);
            })
    }

    const ReadyOrders = () => {
        axios.get(`http://localhost:8088/orderdetails/order/status/restaurant/${r.name}/Ready`)
            .then(resp => {
                setOrder(resp.data);
            })
    }

    const DispatchedOrders = () => {
        axios.get(`http://localhost:8088/orderdetails/order/status/restaurant/${r.name}/Dispatched`)
            .then(resp => {
                setOrder(resp.data);
            })
    }

    const DeliveredOrders = () => {
        axios.get(`http://localhost:8088/orderdetails/order/status/restaurant/${r.name}/Delivered`)
            .then(resp => {
                setOrder(resp.data);
            })
    }

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>

            <div className="container m-5">
                <div className="d-flex m-3" style={{ justifyContent: "space-between" }}>
                    <div className="heading">
                        <h1 style={{ fontSize: "1.5rem" }}>Orders</h1>
                    </div>

                    <div className="ui buttons">
                        <button className="ui button" onClick={AllOrders}>All</button>
                        <button className="ui button" onClick={PendingOrders}>Pending</button>
                        <button className="ui button" onClick={ReadyOrders}>Ready</button>
                        <button className="ui button" onClick={DispatchedOrders}>Dispatched</button>
                        <button className="ui button" onClick={DeliveredOrders}>Delivered</button>
                    </div>
                </div>


                {
                    order.length > 0 ?
                        (

                            <table className="ui yellow table text-center">
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Order Id</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        order.map(o =>
                                            <tr key={o.id}>
                                                <td>{o.id}</td>
                                                <td>{o.quantity}</td>
                                                <td>Rs. {o.price}</td>
                                                <td>{o.orderId}</td>
                                                <td>
                                                    <span className={o.status === "Delivered" ? "ui button green mini" : "ui button grey basic mini"}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="ui mini icon buttons mr-3">
                                                        {
                                                            o.status === "Delivered" ?
                                                                (
                                                                    <div className="ui button basic green mini">
                                                                        <i className="check icon"></i>
                                                                    </div>
                                                                ) :
                                                                (
                                                                    <Link className="mini basic blue ui button" to={`/restaurant/order/edit/${o.id}`}>
                                                                        <i className="edit icon"></i>
                                                                    </Link>
                                                                )
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )

                                    }
                                </tbody>
                            </table>
                        ) :
                        (
                            <div className="m-3">
                                <div className="ui red small message">
                                    No Orders
                                </div>
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default RestaurantOrder;