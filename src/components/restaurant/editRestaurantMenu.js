import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarRestaurant from "./navbar";

function EditMenu() {

    // const r = JSON.parse(localStorage.getItem('restaurant'));

    const { id } = useParams();

    const navigate = useNavigate();

    const [foodImage, setFoodImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageId, setImageId] = useState(0);

    const [foodItem, setFoodItem] = useState({});

    const [foodId, setFoodId] = useState(foodItem.id);
    const [name, setName] = useState(foodItem.name);
    const [price, setPrice] = useState(foodItem.price);
    const [restaurant, setRestaurant] = useState(foodItem.restaurant);

    useEffect(() => {
        (async () => {
            await axios.get("http://localhost:8088/food/id/" + id)
                .then(resp => {
                    setFoodItem(resp.data);

                    setFoodId(resp.data.id);
                    setName(resp.data.name);
                    setPrice(resp.data.price);
                    setRestaurant(resp.data.restaurant);
                });

            await axios.get(`http://localhost:8088/image/food/imageid/${id}`)
                .then(resp => {
                    setImageId(resp.data);
                })


            const resp = await fetch(`http://localhost:8088/image/food/fd/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            setFoodImage(url);

        })();
    }, [id])

    const [error, setError] = useState([]);

    const editItem = () => {
        let err = [];

        if (!name) { err["nameError"] = "Please Enter Food Name."; }
        if (!price) { err["priceError"] = "Please Enter Food Price."; }
        if (!restaurant) { err["restaurantError"] = "Please Enter Restaurant Name."; }
        if (!foodImage || foodImage instanceof File) { err['restaurantImageError'] = "Add an image." }

        setError(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            const payload = {
                id: foodId,
                name: name,
                price: price,
                restaurant: restaurant
            }

            console.log(payload);

            axios.put("http://localhost:8088/food/edit/", payload)
                .then(resp => {
                    alert("Edited Successfully !");
                    navigate("/restaurant/menu");
                });
        }

    }


    const handleRestaurantImage = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);

        setFoodImage(file);
    }

    const updateImage = () => {
        const updatedImageData = new FormData();
        updatedImageData.append("foodImage", foodImage);
        console.log(foodImage);

        axios.put(`http://localhost:8088/image/food/update/${imageId}/${foodId}`, updatedImageData).then(resp => {
            alert("Updated Image");
            window.location.reload();
        })
            .catch(error => {
                console.log(error.response.data.message);
            });
    }

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>

            <div className="container row" style={{ width: "fit-content", margin: "auto" }}>

                <div className="col-sm-6">
                    <div className="image resImg">
                        {
                            preview ?
                                (
                                    <img src={preview} alt="preview" className="foodImage" />
                                ) :
                                (
                                    <img src={foodImage} alt="food" className="foodImage" />
                                )
                        }
                    </div>
                    <div className="field mb-3">
                        <div className="" style={{ display: "inline-flex", placeItems: "baseline" }}>
                            <div className="m-2">
                                <label for="file" class="file-style">
                                    <p><i class="upload icon"></i> Upload Photo</p>
                                </label>
                                <input type="file" class="file" id="file" name="foodImage" placeholder="Add Image"
                                    defaultValue={foodImage} onChange={handleRestaurantImage} />
                            </div>
                            {
                                error.foodImageError &&
                                <div className="ui red mini message">{error.foodImageError}</div>
                            }

                            <div className="field  m-2">
                                <button className="ui yellow button" onClick={updateImage} style={{ borderRadius: "50px" }}>Update</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-sm-6">
                    <div className="card m-5 p-5">
                        <div className="heading text-left">
                            <h1 style={{ color: "#777", fontSize: "1.5rem" }}>Edit Item</h1><hr></hr>
                        </div>
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
                                <label>Restaurant</label>
                                <input type={"text"} name="Restaurant" placeholder="Restaurant"
                                    value={restaurant} onChange={(event) => setRestaurant(event.target.value)} disabled />
                                {
                                    error.restaurantError &&
                                    <div className="ui red small message">{error.restaurantError}</div>
                                }
                            </div>
                            <div className="field">
                                <button className="fluid ui yellow button mb-3" onClick={editItem}>Edit</button>

                                <Link className="fluid ui button" to={"/restaurant/menu"}>Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditMenu;