
// import axios from "axios";
// import * as actiontype from './store/action';
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import CategoriseComponnent from "./CategoriesComponnent";


// const Filtering = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [duration, SetDuration] = useState(120);
//     const [difficulty, SetDifficulty] = useState("0");
//     const { state } = useLocation();
//     const dispatch = useDispatch();
//     const allRecipes = useSelector((state) => state.recipes);
//     console.log("allRecipes", allRecipes);
//     // setRecipes([...allRecipes]);
//     // console.log("allRecipes:rrr", recipes)

//    const onSubmitSerch=()=>{

//    }

//     return <>
//         <div class="select">
//             <label>קטגוריה:</label><br />
//             <CategoriseComponnent />
//         </div>
//         <div class="select">
//             <label> :דרגת קושי</label><br />
//             <select id="difficulty" onChange={event => {
//                 SetDifficulty(event.target.value);
//             }}>
//                 <option value="0">בחר</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//             </select>
//         </div>
//         <p>משך זמן הכנה:{duration} דקות</p>
//         <input type="range" min="1" max="120" class="slider" style={{ color: "black" }} onChange={event => {
//             SetDuration(event.target.value);
//         }} />
//         <br />

//     </>


// }
// export default Filtering;
import axios from "axios";
import * as actiontype from './store/action';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CategoriseComponnent from "./CategoriesComponnent";
import './bootstrap.min.css';

const Filtering = ({ onFilter }) => {
    const allCategories = useSelector((state) => state.categories);
    const [recipes, setRecipes] = useState([]);
    const [duration, SetDuration] = useState(120);
    const [category, setCategory] = useState(allCategories[0].Id)
    const [difficulty, SetDifficulty] = useState("0");
    const { state } = useLocation();
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    const onFilterSubmit = () => {
        onFilter(category, difficulty, duration);
    }

    const onC = (val) => {
        setCategory(val)
    }

    return (
        <>
            <div class="select">
                <label>קטגוריה:</label><br />
                <CategoriseComponnent selectedCategory={category} onChange={onC} />
            </div>
            <div class="select">
                <label> :דרגת קושי</label><br />
                <select id="difficulty" onChange={event => {
                    SetDifficulty(event.target.value);
                }}>
                    <option value="0">בחר</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <p>משך זמן הכנה:{duration} דקות</p>
            <input type="range" min="1" max="120" class="slider" style={{ color: "black" }} onChange={event => {
                SetDuration(event.target.value);
            }} />
            <br />
            <button  class="btn btn-danger"  onClick={onFilterSubmit}>חפש</button>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {recipes.map(recipe => (
                    <div key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <p>זמן הכנה: {recipe.duration} דקות</p>
                        <p>דרגת קושי: {recipe.difficulty}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Filtering;