//פה צריך להיות אינפוטים של הרשמה
//וכפתור שליחה שבו מתווסף אותו משתמש לרשימת המשתמשים - במקרה שלא היה שם קודם!
import Header from "./Header";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as actionsName from './store/action'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const schema = yup.object({
    //התופס לא נשלח
    Username: yup.string().required(),
    Password: yup.string().required(),
    Name: yup.string().required(),
    Phone: yup.string().required(),
    Email: yup.string().email({ domain: ["example.com"], }).required(),
    Tz: yup.string().required()

}).required();

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        // console.log("onsubmit: ");

        // console.log("data: ", data);
        axios.post('http://localhost:8080/api/user/sighin', data)
            .then((res) => {
                navigate('/Home');
                alert("welcome our cookBook");
                dispatch({ type: actionsName.SET_USER, user: res.data });

            }).catch(res => alert("the user exsit"))
    }
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({ // פונקציות ונתונים שימושיים מהטופס.
        resolver: yupResolver(schema), // יוצרת טופס ומחברת לו את סכימת הוולידציה.
    })
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input class="btn btn-secondary" placeholder="Username" {...register("Username")} />
                <p>{errors.username?.message}</p>

                <input class="btn btn-secondary" placeholder="password" {...register("Password")} />
                <p>{errors.password?.message}</p>

                <input class="btn btn-secondary" placeholder="name" {...register("Name")} />
                <p>{errors.name?.message}</p>

                <input class="btn btn-secondary" placeholder="phone" {...register("Phone")} />
                <p>{errors.phone?.message}</p>

                <input class="btn btn-secondary" placeholder="email" {...register("Email")} />
                <p>{errors.email?.message}</p>

                <input class="btn btn-secondary" placeholder="tz" {...register("Tz")} />
                <p>{errors.tz?.message}</p>

                <input  class="btn btn-danger" type="submit" />
            </form>
        </>)
}
export default Signin;