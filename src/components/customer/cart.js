import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarCustomer from "./navbar";

function Cart() {

    const u = JSON.parse(localStorage.getItem('user'));

    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const [msg, setMsg] = useState('No Items Added');
    const [totalMsg, setTotalMsg] = useState('');

    useEffect(() => {
        (async () => {
            const resp1 = await axios.get("http://localhost:8088/cart/customer/" + u.id)
                                .catch((error) => {
                                    setMsg(error.response.data);
                                });
            setCartItems(resp1.data);

            const resp2 = await axios.get("http://localhost:8088/cart/customer/total/" + u.id)
                                .catch((error) => {
                                    setTotalMsg(error.response.data);
                                });
            setTotal(resp2.data);
            localStorage.setItem('total', resp2.data);
        })();
    }, [u.id])

    const cartCount = cartItems.length;

    // const order  = () => {

    //     localStorage.setItem("order", JSON.stringify())
    // }

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            <div className="container">

                <div className="row p-3">

                    <div className="col-sm-9 p-5">
                        <div className="heading text-left p-2">
                            <h1 style={{ color: "#777", fontSize: "1.5rem" }}>Cart</h1>
                        </div>

                        {
                            cartItems.length > 0 ?
                            (<div>
                                <table className="ui yellow table">
                                    <thead>
                                        <tr><th>Sr No.</th>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map((c) =>
                                                <tr key={c.id}>
                                                    <td>{c.id}</td>
                                                    <td>{c.itemName}</td>
                                                    <td>{c.quantity}</td>
                                                    <td>Rs. {c.price}</td>
                                                    <td>
                                                        <div className="ui small red basic icon buttons">
                                                            <Link className="ui button" to={`/cart/delete/${c.id}`}>
                                                                <i className="trash icon"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>) :
                            (<div>
                                {   
                                    msg &&
                                    <div className="ui red small message">{msg}</div>
                                }
                            </div>)
                        }

                    </div>

                    <div className="col-sm-3 p-5">
                        <div className="heading text-left">
                            <h1 style={{ color: "#777", fontSize: "1.5rem" }}>Payment</h1><hr></hr>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex payment" style={{ justifyContent: "space-between", fontSize: "12px" }}>
                                <p style={{ color: "#777" }}>Items</p>
                                <p>{cartCount}</p>
                            </div>
                            <div className="d-flex payment" style={{ justifyContent: "space-between", fontSize: "12px" }}>
                                <p style={{ color: "#777" }}>Price</p>
                                <p>Rs. {    
                                        total ? 
                                        (total) :
                                        (totalMsg)
                                        }</p>
                            </div>
                            <div className="d-flex payment" style={{ justifyContent: "space-between", fontSize: "12px" }}>
                                <p style={{ color: "#777" }}>Delivery</p>
                                <p>Free</p>
                            </div>
                            <hr></hr>
                            <div className="d-flex payment" style={{ justifyContent: "space-between" }}>
                                <p><b>Total</b></p>
                                <p><b>Rs. {total}</b></p>
                            </div>
                            <div className="">
                                <Link to={cartItems.length > 0 ? "/payment" : ""} className="mini fluid ui button green">
                                    Proceed for Payment
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default Cart;