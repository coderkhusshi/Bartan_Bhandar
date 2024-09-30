import axios from "axios";
import React, { useEffect, useState } from "react";
import CompletedOrders from "./completedOrders";
import NavbarDeliveryBoy from "./navbar";


function CollectedOrders() {

    const d = JSON.parse(localStorage.getItem("deliveryboy"));

    const [collectedOrder, setCollectedOrder] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);

    const [deliveredOrder, setDeliveredOrder] = useState([]);

    const [msg, setMsg] = useState('');

    useEffect(() => {
        (async () => {

            await axios.get(`http://localhost:8088/collectedorder/delivered/not/delivery/${d.id}`)
                .then(resp => {
                    setCollectedOrder(resp.data);

                    axios.get("http://localhost:8088/orderdetails/order/" + resp.data.orderId)
                        .then(resp2 => {
                            setOrderDetails(resp2.data);
                        });
                })
                .catch(error => {
                    setMsg(error.response.data);
                });


            await axios.get(`http://localhost:8088/collectedorder/delivered/delivery/${d.id}`)
                .then(resp => {
                    setDeliveredOrder(resp.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        })();
    }, [d.id]);

    const deliveryDone = async (order) => {

        const ord = {
            id: order.id,
            orderId: order.orderId,
            itemId: order.itemId,
            itemName: order.itemName,
            quantity: order.quantity,
            price: order.price,
            restaurant: order.restaurant,
            status: "Delivered",
            customerId: order.customerId
        }

        await axios.put("http://localhost:8088/orderdetails/update", ord)
            .then(resp => {
                alert("Updated Successfully.");
                window.location.reload();
            });

        
        const uptCollectedOrder = {
            id: collectedOrder.id,
            orderId: collectedOrder.orderId,
            deliveryBoyId: collectedOrder.deliveryBoyId,
            delieveryBoyName: collectedOrder.delieveryBoyName,
            isDelivered: true
          }

        await axios.put("http://localhost:8088/collectedorder/update", uptCollectedOrder);
    }


    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarDeliveryBoy />
            </div>

            <div className="heading m-3">
                <h2>Collected Order</h2>
            </div>

            <div className="container">
                {
                    orderDetails.length > 0 ?
                        (
                            <div className="">
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderDetails.map(d =>
                                                <tr key={d.id}>
                                                    <td>{d.id}</td>
                                                    <td>{d.itemName}</td>
                                                    <td>{d.quantity}</td>
                                                    <td>Rs. {d.price}</td>
                                                    <td>{d.restaurant}</td>
                                                    <td>{d.orderId}</td>
                                                    <td>
                                                        <span className={d.status === "Delivered" ? "ui button green mini" : "ui button grey basic mini"}>
                                                            {d.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="ui mini icon buttons mr-3">
                                                            {
                                                                d.status === "Delivered" ?
                                                                    (
                                                                        <div className="ui button basic green mini">
                                                                            <i className="check icon"></i>
                                                                        </div>
                                                                    ) :
                                                                    (
                                                                        <button className="ui button primary mini" onClick={() => deliveryDone(d)}>
                                                                            Delivered
                                                                        </button>
                                                                    )
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
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



            <div className="container mt-5">
                <div className="heading m-3">
                    <h2>Orders Delivered</h2>
                </div>
                {
                    deliveredOrder.length > 0 ?
                        (
                            <div className="">
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                        {
                                            deliveredOrder.map(d =>
                                                <CompletedOrders key={d.id} orderId={d.orderId} />
                                            )
                                        }
                                </table>



                            </div>
                        ) :
                        (
                            <div className="ui red mini message">
                                No Orders Delivered Yet.
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default CollectedOrders;