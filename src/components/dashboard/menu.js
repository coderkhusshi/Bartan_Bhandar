import React, { useState } from "react";

import food from "./images/food.jpg";
import NavbarRestaurant from "../restaurant/navbar";

function Menu() {

    const [count, setCount] = useState(1);

    const counterAdd = () => {
        setCount(count + 1);
    }
    const counterSub = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>

            <div className="container-fluid">
                <div className="ui card text-left m-3" style={{ width: "230px" }}>
                    <a className="image" href="#">
                        <img src={food} />
                    </a>
                    <div className="content">
                        <div className="heading">
                            <h1>kitchen Appliances</h1>
                            <hr></hr>
                        </div>
                        <div className="price d-flex" style={{ justifyContent: "space-between" }}>
                            <h3>Rs. 200</h3>
                            <div className="ui circular labels">
                                <button className="ui compact label icon button yellow" onClick={counterAdd}>
                                    <i className="plus icon"></i>
                                </button>
                                <span className="count" style={{ padding: "4px 8px", marginRight: "5px", border: "1px solid #ccc", borderRadius: "20px" }}>{count}</span>
                                <button className="ui compact label icon button yellow" onClick={counterSub}>
                                    <i className="minus icon"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <button className="fluid ui yellow button" >Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Menu;