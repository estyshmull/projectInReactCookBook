//כאן יהיה בעז"ה כל המתכונים שנייבא מהאתר של המורה
import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as actionsName from './store/action';
import { useNavigate } from 'react-router-dom'
import Filtering from "./Filtering";
import './css.css'
const Recipes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [categorise, setCategorise] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/recipe')
            .then((res) => {
                setRecipes(res.data);
                setFilteredRecipes(res.data);
                dispatch({ type: actionsName.SET_RECIPES, payload: res.data })
            })
            .catch(er => er)
        axios.get('http://localhost:8080/api/category')
            .then((res) => {
                setCategorise(res.data);
            })
            .catch(er => (er))
    },[]);


    const onFilter = (category, diffiulty, duration) => {
        setFilteredRecipes(filteredRecipes.filter(recipe => recipe.CategoryId.toString() === category
        || recipe.Difficulty.toString() === diffiulty
        || recipe.Duration <= duration));
    }


    return (
        <>
            <Header />
            <Filtering onFilter={onFilter} />
            <button  class="btn btn-danger" onClick={(event) => navigate('/AddRecipes')}>להוספת מתכון</button>
            <h1>המתכונים שלנו</h1>
            {/* <Filtering/> */}


            <ul>{filteredRecipes.map((x) => <div>
                <img class="sad-rectangle" src={x.Img}></img>
                <h4>{x.Name}</h4>
                {/* לשנות את הניתוב של הדף להצגת מתכון */}
                <button class="btn btn-secondary" onClick={() => navigate('/ShowRecipe', { state: x })}>הצגת מתכון</button>
            </div>
            )}</ul>
        </>
    )
}
export default Recipes;