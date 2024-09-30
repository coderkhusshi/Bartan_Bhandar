import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ModalAddFood() {

    const r = JSON.parse(localStorage.getItem('restaurant'));

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [restaurant, setRestaurant] = useState(r.name);

    const [foodImage, setFoodImage] = useState(null);

    const [error, setError] = useState([]);


    const handleFoodImage = (e) => {
        console.log(e.target.files);
        setFoodImage(e.target.files[0]);
    }

    const addFoodItem = () => {
        let err = [];

        if (!name) { err["nameError"] = "Please Enter Food Name."; }
        if (!price) { err["priceError"] = "Please Enter Food Price."; }
        if (!restaurant) { err["restaurantError"] = "Please Enter Restaurant Name."; }

        if (!foodImage) { err["foodImageError"] = "Please Enter Food Image."; }

        setError(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            const payload = {
                name: name,
                price: price,
                restaurant: restaurant
            }

            const imageData = new FormData();
            imageData.append('foodImage', foodImage);

            axios.post("http://localhost:8088/food/add", payload)
                .then(resp => {
                    axios.post("http://localhost:8088/image/food/upload/" + resp.data.id, imageData).then(res => {
                        alert("Added");
                        window.location.reload()
                    });
                })
        }

    }

    return (
        <div className=''>

            <div className="contariner-fluid text-left ui form p-3">
                <div className="field pb-3">
                    <label>Name</label>
                    <input type={"text"} name="name" placeholder="Name"
                        value={name} onChange={(event) => setName(event.target.value)} />
                    {
                        error.nameError &&
                        <div className="ui red small message">{error.nameError}</div>
                    }
                </div>
                <div className="field pb-3">
                    <label>Price</label>
                    <input type={"number"} name="Price" placeholder="Price"
                        value={price} onChange={(event) => setPrice(event.target.value)} />
                    {
                        error.priceError &&
                        <div className="ui red small message">{error.priceError}</div>
                    }
                </div>
                <div className="field pb-3">
                    <label>shop</label>
                    <input type={"text"} name="Restaurant" placeholder="Restaurant"
                        value={restaurant} onChange={(event) => setRestaurant(event.target.value)} disabled />
                    {
                        error.restaurantError &&
                        <div className="ui red small message">{error.restaurantError}</div>
                    }
                </div>
                <div className="field">
                    <label>Upload Image</label>
                    <input type="file" name="foodImage" placeholder="Add Image"  
                        defaultValue={foodImage} onChange={handleFoodImage} />
                    {
                        error.foodImageError &&
                        <div className="ui red mini message">{error.foodImageError}</div>
                    }
                </div>
                <div className="field pb-3">
                    <button className="fluid ui yellow button" onClick={addFoodItem} data-dismiss={error.length === 0 ? "modal" : " "}>Add</button>
                </div>
            </div>

        </div>
    )
}

export default ModalAddFood;