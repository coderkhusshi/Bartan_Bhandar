import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarCustomer from "./navbar";

// not used

function MyOrders() {

  //  const u = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams();

    const [orders, setOrders] = useState([]);

    const [msg, setMsg] = useState('No Orders Yet');

    useEffect(() => {
        (async () => {
            const ord = await axios.get("http://localhost:8088/order/customer/"+id)
                            .catch(error => {
                                setMsg(error.response.data);
                            });
            setOrders(ord.data);
        })();
    },[id])

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            <div className="container m-5">
                <div className="d-flex m-3" style={{ justifyContent: "space-between" }}>
                    <div className="heading">
                        <h1 style={{ fontSize: "1.5rem" }}>My Orders</h1>
                    </div>
                </div>

                {
                    orders.length > 0 ? 
                    (
                    <table className="ui yellow table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
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
                                    <td>Rs. {o.price}</td>
                                    <td>{o.date}</td>
                                    <td>{o.status}</td>
                                    <td style={{ width: "10rem" }}>
                                        <Link to={`/order/details/${o.id}`} className="mini ui primary right labeled icon button">
                                            <i className="right arrow icon"></i>
                                            Details
                                        </Link>
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

export default MyOrders;