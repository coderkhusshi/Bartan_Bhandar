import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarDeliveryBoy from "./navbar";


//not used

function CollectedOrderUpdate() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [oId, setOId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [status, setStatus] = useState('');
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {

        (async () => {
            const resp = await axios.get("http://localhost:8088/orderdetails/id/" + id);

            setOId(resp.data.id);
            setOrderId(resp.data.orderId);
            setItemId(resp.data.itemId);
            setItemName(resp.data.itemName);
            setQuantity(resp.data.quantity);
            setPrice(resp.data.price);
            setRestaurant(resp.data.restaurant);
            setStatus(resp.data.status);
            setCustomerId(resp.data.customerId);
        })();
    }, [id]);

    const updateOrder = () => {
        const ord = {
            id: oId,
            orderId: orderId,
            itemId: itemId,
            itemName: itemName,
            quantity: quantity,
            price: price,
            restaurant: restaurant,
            status: status,
            customerId: customerId
        }

        axios.put("http://localhost:8088/orderdetails/update", ord)
            .then(resp => {
                alert("Updated Successfully.");
                navigate("/delivery/order/collected");
            });
    }

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarDeliveryBoy />
            </div>

            <div className="container" style={{ width: "fit-content" }}>
                <div className="card m-5 p-5">
                    <div className="heading text-center mb-3">
                        <h1 style={{ color: "#777", fontSize: "1.5rem" }}>Update Order</h1>
                    </div>

                    <table className="table text-left">
                        <tr>
                            <th>Id : </th>
                            <td>{oId}</td>
                        </tr>
                        <tr>
                            <th>Item Name : </th>
                            <td>{itemName}</td>
                        </tr>
                        <tr>
                            <th>Quantity : </th>
                            <td>{quantity}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{status}</td>
                            {/* <td><select className="ui dropdown" value={status} onChange={(event) => setStatus(event.target.value)}>
                                <option value="Delivered">Delivered</option>
                            </select></td> */}
                        </tr>
                    </table>
                    <div className="field">
                        <button className="fluid ui yellow button mb-3" onClick={updateOrder}>Update</button>

                        <Link className="fluid ui button" to={"/delivery/order/collected"}>Cancel</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CollectedOrderUpdate;