import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";
import ModalAddFood from "./modal";
import NavbarRestaurant from "./navbar";

function RestaurantMenu() {

    const r = JSON.parse(localStorage.getItem("restaurant"));

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8088/food/all/" + r.name)
            .then(resp => {
                setMenu(resp.data);
            });
    }, [r.name])



    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>


            <div className="container m-5">
                <div className="d-flex m-3" style={{ justifyContent: "space-between" }}>
                    <div className="heading">
                        <h1 style={{ fontSize: "1.5rem" }}>Categories</h1>
                    </div>
                    <button className="mini ui green right labeled icon button" data-toggle="modal" data-target="#myModal">
                        <i className="plus icon"></i>
                        Add
                    </button>
                </div>

                <div className="container">
                    <table className="ui yellow table">
                        <thead>
                            <tr>
                                <th>Utensil Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map(m =>
                                    <Menu key={m.id} id={m.id} name={m.name} price={m.price} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title">Add to Category</h1>
                            <button className="ui icon button" data-dismiss="modal" style={{ background: "transparent" }}>
                                <i className="delete red icon"></i>
                            </button>
                        </div>

                        <div className="modal-body">
                            <ModalAddFood />
                        </div>

                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div> */}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default RestaurantMenu;