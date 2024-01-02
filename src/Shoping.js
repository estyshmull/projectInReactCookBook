//כאן יהיה רשימת הקניות של כל משתמש
import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

const Shoping = () => {
    const navigate = useNavigate();
    const [product, setProducts] = useState([])
    const userShopingCart = useSelector((state) => state.shoppingCart);
    useEffect(() => {
        setProducts(userShopingCart)

    }, [product]);
    console.log("product:", product)
    const decreaseQuantity = (product1) => {
        if (product&& product1.Count>0)
            {product1.Count--;}
        setProducts([...product]);
    }

    return (<>
        <Header />
        <table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
                <tr>
                    <th style={{ backgroundColor: "#ccc", padding: "5px" }}>
                        שם המוצר
                    </th>
                    <th style={{ backgroundColor: "#ccc", padding: "5px" }}>
                        כמות המוצר
                    </th>
                </tr>
            </thead>
            <tbody>
                {product.map((product) => (
                    <tr key={product.Name}>
                        <td style={{ padding: "5px" }}>{product.Name}</td>
                        <td style={{ padding: "5px" }}>{product.Count}</td>
                        <td>
                            <button onClick={() => decreaseQuantity(product)}>-</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* <button onClick={()=>navigate('/ShowRecipe',{state:state})}>חזרה למתכון</button> */}
    </>)
}
export default Shoping;