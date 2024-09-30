import React, { useEffect, useState } from "react";

import './payment.css';

import suc from "./images/successful.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {

    const u = JSON.parse(localStorage.getItem('user'));

    const t = localStorage.getItem('total');

    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8088/cart/customer/" + u.id)
            .then((resp) => setCartItems(resp.data));
    },[u.id])

    //to count total items 
    let totalQuantity = 0;
    cartItems.map(e => totalQuantity += e.quantity );

    const[oId, setOId] = useState(0);

    const [errors, setErrors] = useState({});

    const [check, setCheck] = useState(false);

    //payment validation controls
    const [cardHolder, setCardHolder] = useState('tanmay');
    const [cardNumber, setCardNumber] = useState('2222222222222222');
    const [expMonth, setExpMonth] = useState('11');
    const [expYear, setExpYear] = useState('11');
    const [cvv, setCvv] = useState('123');

    const addOrder = async () => {
        let err = [];

        const validCardHolder = new RegExp("^[A-Za-z]+$");
        const validCardNumber = new RegExp("^[0-9]{16}$");
        const validExpMonth = new RegExp("^[0-9]{2}$");
        const validExpYear = new RegExp("^[0-9]{2}$");
        const validCvv = new RegExp("^[0-9]{3}$");

        if(!cardHolder || !validCardHolder.test(cardHolder)) { err["cardHolderError"] = "Enter Valid Card Holder Name."};
        if(!cardNumber || !validCardNumber.test(cardNumber)) { err["cardNumberError"] = "Enter Valid Card Number."};
        if(!expMonth || !expYear || !validExpMonth.test(expMonth) || !validExpYear.test(expYear)) { err["expDateError"] = "Enter Valid Date."};
        if(!cvv || !validCvv.test(cvv)) { err["cvvError"] = "Enter Valid CVV."};

        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if(noError) {
            setCheck(true);

            //Creating an object of "Order"
            const order = {
                date: "11-8-2023",
                customerId: u.id,
                quantity: totalQuantity,
                price: t,
                status: "Pending",
                colected: false
            }
        
            //Posting object of "Order"
            const ord =  await axios.post("http://localhost:8088/order/add",order);

            setOId(ord.data.id);

            //Iterating through "cartItems" to post data into "Order_Details" table
            cartItems.map(c => {

                //Creating object of "OrderDetails"
                const item = {
                    orderId: ord.data.id,
                    itemId: c.id,
                    itemName: c.itemName,
                    quantity: c.quantity,
                    price: c.price,
                    restaurant: c.restaurant,
                    status: "Pending",
                    customerId: u.id 
                }

                //Posting object of "OrderDetails" 
                return axios.post("http://localhost:8088/orderdetails/add", item)
            });

            //Removing items from "CART" by "customerId"
            axios.delete("http://localhost:8088/cart/delete/customer/"+u.id);


            //Creating object of "Payment"
            const payment = {
                customerId: u.id,
                orderId: oId,
                date: "17-08-2023",
                amount: t
            }

            //Posting object "Payment"
            await axios.post("http://localhost:8088/payment/add", payment);
        }
    }


    return (
        <div className="">

            <div className="">

                <main className="page-pay payment-page">
                    <section className="payment-form dark">
                        <div className="container">
                            <div className="block-heading">
                                <h2>Payment</h2>
                            </div>
                            <form className="text-left">
                                <div className="products">
                                    <h3 className="title text-center">Checkout</h3>
                                    
                                    {
                                        cartItems.map((c) =>
                                            <div className="item" key={c.id}>
                                                <span className="price">Rs. {c.price}</span>
                                                <p className="item-name">{c.itemName}</p>
                                            </div>
                                        )
                                    }
                                    
                                    <div className="item">
                                        <span className="price">Free</span>
                                        <p className="item-name">Delivery</p>
                                    </div>
                                    <div className="total">Total<span className="price"><b>Rs. {t}</b></span></div>
                                </div>

                                <div className="card-details">
                                    <h3 className="title text-center">Card Details</h3>
                                    <div className="row">
                                        <div className="form-group col-sm-7">
                                            <label for="card-holder">Card Holder</label>
                                            <div className="ui fluid icon input">
                                                <input type="text" placeholder="Card Holder" aria-label="Card Holder" aria-describedby="basic-addon1" 
                                                    value={cardHolder} onChange={(event) => setCardHolder(event.target.value)} />
                                            </div>
                                            {
                                                errors.cardHolderError && 
                                                <div className="ui red mini message">{errors.cardHolderError}</div>
                                            }
                                        </div>
                                        <div className="form-group col-sm-5">
                                            <label for="">Expiration Date</label>
                                            <div className="input-group expiration-date">
                                                <div className="ui icon input" style={{ width: "6.2rem" }}>
                                                    <input type="text" placeholder="MM" aria-label="MM" aria-describedby="basic-addon1"
                                                        value={expMonth} onChange={(event) => setExpMonth(event.target.value)}  />
                                                    <span className="date-separator">/</span>
                                                    <input type="text" placeholder="YY" aria-label="YY" aria-describedby="basic-addon1"
                                                        value={expYear} onChange={(event) => setExpYear(event.target.value)}  />
                                                </div>
                                            </div>
                                            {
                                                errors.expDateError && 
                                                <div className="ui red mini message">{errors.expDateError}</div>
                                            }
                                        </div>
                                        <div className="form-group col-sm-8">
                                            <label for="card-number">Card Number</label>
                                            <div className="ui fluid icon input">
                                                <input type="text" placeholder="Card Number" aria-label="Card Number" aria-describedby="basic-addon1" 
                                                    value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
                                            </div>
                                            {
                                                errors.cardNumberError && 
                                                <div className="ui red mini message">{errors.cardNumberError}</div>
                                            }
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label for="cvv">CVV</label>
                                            <div className="ui fluid icon input">
                                                <input type="text" placeholder="CVV" aria-label="CVV" aria-describedby="basic-addon1" 
                                                    value={cvv} onChange={(event) => setCvv(event.target.value)} />
                                            </div>
                                            {
                                                errors.cvvError && 
                                                <div className="ui red mini message">{errors.cvvError}</div>
                                            }
                                        </div>
                                        <div className="form-group col-sm-12">
                                            <button type="button" className="ui fluid blue button" data-toggle="modal" data-target={!check ? "" : "#exampleModal"} onClick={addOrder}>Proceed</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>

            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog .modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h5 className="modal-title" id="exampleModalLabel">Payment Successful</h5> */}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => navigate(`/order/details/${u.id}`)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <div className="m-3">
                                <h1>Payment Successful !</h1>
                            </div>
                            <img src={suc} alt="successful" style={{ width: "10rem" }} />
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Go to Home</button>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment;