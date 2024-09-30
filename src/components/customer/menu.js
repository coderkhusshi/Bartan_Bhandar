import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuImage from "./menuImage";

function Menu() {

    const [foodItems, setFoodItems] = useState([]);

    //to shuffle the list 
    //const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

    useEffect(() => {
        axios.get("http://localhost:8088/food/all")
            .then((resp) => setFoodItems(resp.data))
    }, []);

    return (
        <div className="">
            <div className="container-fluid row" style={{ margin: "0px" }}>
                {
                    foodItems.map((f) =>
                        <div className="col-sm-3 p-3" key={f.id}>
                            <div className="ui card text-left" style={{ height: "fit-content", margin: "0px" }}>
                                <MenuImage id={f.id} key={f.id} />
                                <div className="content">
                                    <div className="">
                                        <div className="price">
                                            <h3 style={{font:"20px bold", color:"#000"}}>Rs. {f.price}</h3>
                                        </div>
                                        <div className="heading mt-3">
                                            <h3 style={{font:"15px bold", color:"#000"}}>{f.name}</h3>
                                        </div>
                                    </div>    
                                    <div className="m-3 text-center">
                                        <p className="res" style={{font:"20px bold", color:"#777"}}>{f.restaurant}</p>
                                    </div>
                                    <div>
                                        <Link to={`/menu/${f.id}`} className="fluid ui yellow button">View</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Menu;