//כאן צריך עיצוב לדף הבית!!!
import { useDispatch ,useSelector} from 'react-redux';
import axios from "axios";
import * as actionsName from './store/action';
import { useState } from 'react';
import Header from './Header';
import Shoping from './Shoping';

const Home = () => {
    const dispatch = useDispatch();
    const userName=useSelector((state) => state.user.Username)
    return (
        <>
        <Header/>
            <h1>my cookBook</h1>
            <p>HI {userName}</p>
        </>
    )
}
export default Home;