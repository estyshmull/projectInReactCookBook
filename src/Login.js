//פה צריך להיות שתי אינפוטים- אחד של שם משתמש ואחד של סיסמה
//וכפתור של שליחה ששולח לפונקציית שליחה שבודקת אם המשתמש קיים
//אם קיים היא מכניסה אותו לתוך אתר המתכונים ואם לא היא שולחת אותו לקומפוננטצ הרשמה
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector, useState } from 'react-redux';
import * as actionsName from './store/action';
import { useLocation } from 'react-router-dom';
import './css.css'

const schema = yup
    .object({
        Username: yup.string().required(),
        Password: yup.string().required(),
    })
    .required()

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post('http://localhost:8080/api/user/login', data)
            .then((x) => {
                navigate('/Home');
                dispatch({ type: actionsName.SET_USER, user: x.data })
                console.log(x.data.Id, x.data.Username)
                axios.get(`http://localhost:8080/api/bay/${x.data.Id}`)
                    .then(res => {
                        console.log(res.data)
                        dispatch({ type: actionsName.ADD_SHOPPING_CART,payload: res.data })
                    })
                .catch(console.log("error while add shopping cart"))

                axios.get('http://localhost:8080/api/category')
                    .then((res) => {
                        console.log("state of category",res.data)
                        dispatch({ type: actionsName.GET_CATEGOIES,payload: res.data })
                    })
                    .catch(console.log("is not good category") )
            }
            )
            .catch(x => alert("the user is not found!!!"))
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })



    return (
        <>
            <h1>כניסה למערכת</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input class="btn btn-secondary" {...register("Username")} />
                <p>{errors.userName?.message}</p>
                <input class="btn btn-secondary" {...register("Password")} />
                <p>{errors.password?.message}</p>
                <input  class="btn btn-danger" type="submit" />
            </form>
        </>
    )
}
export default Login;

