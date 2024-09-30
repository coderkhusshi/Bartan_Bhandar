import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CompletedOrders({orderId}) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:8088/orderdetails/order/${orderId}`)
                .then(resp => {
                    setOrders(resp.data);
                });
        })();
    }, [orderId]);

    return (
        <tbody>
            {
                orders.map(d =>
                    <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.itemName}</td>
                        <td>{d.quantity}</td>
                        <td>Rs. {d.price}</td>
                        <td>{d.restaurant}</td>
                        <td>{d.orderId}</td>
                        <td>
                            <span className="ui button green mini">
                                {d.status}
                            </span>
                        </td>
                        <td>
                            <div className="ui mini icon buttons mr-3">
                                <div className="ui button basic green mini">
                                    <i className="check icon"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            }
        </tbody>
    )
}