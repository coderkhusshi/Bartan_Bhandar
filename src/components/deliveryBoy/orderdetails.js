import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarCustomer from "./navbar";

function OrderDetailsDelivery() {

    const d = JSON.parse(localStorage.getItem("deliveryboy"));

    const navigate = useNavigate();

    const { id } = useParams();

    const [details, setDetails] = useState({});
    const [msg, setMsg] = useState('');

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8088/orderdetails/order/" + id)
                .then(resp => {
                    setDetails(resp.data);
                })
                .catch(error => {
                    setMsg("No Details Found");
                });
            
        })();
    }, [id]);

    
    const collectOrder = async () => {
        const collectedOrder = {
            orderId: id,
            deliveryBoyId: d.id,
            delieveryBoyName: d.firstName + " " + d.lastName,
            isDelivered: false
        }

        await axios.post("http://localhost:8088/collectedorder/add", collectedOrder);


        const updOrder = await axios.get("http://localhost:8088/order/id/" + id);
        const updatedOrder = {
                id: updOrder.data.id,
                date: updOrder.data.date,
                customerId: updOrder.data.customerId,
                quantity: updOrder.data.quantity,
                price: updOrder.data.price,
                status: updOrder.data.status,
                collected: true
        }

        await axios.put("http://localhost:8088/order/update", updatedOrder)
            .then(resp => {
                alert("Collected");
                navigate("/delivery/order/collected");
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
                        <h1 style={{ fontSize: "1.5rem" }}>Order Details</h1>
                    </div>

                    <div className="">
                        {/* <button className="ui button" onClick={PendingOrders}>Pending</button>
                        <button className="ui button" onClick={DeliveredOrders}>Delivered</button> */}
                        <Link to={"/delivery/homepage"} className="mini ui red left labeled icon button">
                            <i className="left arrow icon"></i>
                            <span>Back</span>
                        </Link>
                    </div>
                </div>

                {
                    details.length > 0 ?
                        (
                            <div className="">
                                <table className="ui yellow table">
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
                                                    <td><b>{d.status}</b></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>

                                <div className="ui buttons">
                                    <button className="ui button yellow" onClick={collectOrder}>
                                        Collect
                                    </button>
                                </div>
                            
                            </div>
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

export default OrderDetailsDelivery;