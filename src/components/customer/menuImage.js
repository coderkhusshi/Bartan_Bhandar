import React, { useEffect, useState } from "react";

function MenuImage({id}) {

    const [foodImage, setFoodImage] = useState();

    useEffect(() => {
        (async () => {
            const resp = await fetch(`http://localhost:8088/image/food/fd/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            setFoodImage(url);
        })();
    },[id])

    return (
        <div className="image">
            <img src={foodImage} alt="food" style={{ height:"193px", objectFit: "cover" }}/>
        </div>
    )
}

export default MenuImage;