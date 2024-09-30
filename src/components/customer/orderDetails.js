import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarCustomer from "./navbar";

function MyOrderDetails() {

    const u = JSON.parse(localStorage.getItem("user"));

    const { userId } = useParams();

    const [details, setDetails] = useState([]);
    const [msg, setMsg] = useState('You have ordered nothing.');

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8088/orderdetails/order/status/notdelivered/customer/" + userId)
                .then(resp => {
                    setDetails(resp.data);
                })
                .catch(error => {
                    setMsg(error.response.data);
                })
        })();
    }, [userId]);


    const PendingOrders = () => {
        axios.get("http://localhost:8088/orderdetails/order/status/notdelivered/customer/" + userId)
            .then(resp => {
                setDetails(resp.data);
            });
    }

    const DeliveredOrders = () => {
        axios.get("http://localhost:8088/orderdetails/order/status/customer/" + u.id + "/Delivered")
            .then(resp => {
                setDetails(resp.data);
            });
    }

    return (
        <div className="">
            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            <div className="container m-5">
                <div className="d-flex m-3" style={{ justifyContent: "space-between" }}>
                    <div className="heading">
                        <h1 style={{ fontSize: "1.5rem" }}>My Order Details</h1>
                    </div>
                    {/* <Link to={`/order/${u.id}`} className="mini ui red button">
                        <i className="left arrow icon"></i><span>Back</span>
                    </Link> */}
                    <div className="ui buttons">
                        <button className="ui button" onClick={PendingOrders}>Pending</button>
                        <button className="ui button" onClick={DeliveredOrders}>Delivered</button>
                    </div>
                </div>

                {
                    details.length > 0 ?
                        (
                            <table className="ui yellow table text-center">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Restaurant</th>
                                        <th>Order Id</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        details.map(d =>
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td>{d.itemName}</td>
                                                <td>{d.quantity}</td>
                                                <td>Rs. {d.price}</td>
                                                <td>{d.restaurant}</td>
                                                <td>{d.orderId}</td>
                                                <td>
                                                    {
                                                        d.status === "Delivered" ?
                                                            (
                                                                <div className="">
                                                                    <button className="ui button green mini right labeled icon">
                                                                        {d.status}<i className="check circle outline icon"></i>
                                                                    </button>
                                                                </div>

                                                            ) :
                                                            (
                                                                <span className={"ui button grey basic mini"}>
                                                                    {d.status}
                                                                </span>
                                                            )
                                                    }

                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        ) :
                        (
                            <div>
                                {
                                    msg &&
                                    <div className="ui red small message">{msg}</div>
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default MyOrderDetails;