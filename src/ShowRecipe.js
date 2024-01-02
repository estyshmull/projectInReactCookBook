import { useLocation, useNavigate } from "react-router-dom"
import * as actionsName from './store/action'
import { useState, useEffect } from 'react';
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";

const ShowRecipe = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const userName = useSelector((state) => state.user);
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const [valueChekBox, setValueChekBox] = useState(shoppingCart);
    const dispatch = useDispatch();
    let check = false;

    const handleChange = (x) => {
        if (check === true)
            check = false;
        else
            check = true;
        if (check) {
            setValueChekBox([...valueChekBox, x])
            dispatch({ type: actionsName.ADD_PRODUCT, payload: valueChekBox, user: userName.Id })
        }
        else {
            setValueChekBox(valueChekBox.filter(item => item !== x));
            dispatch({ type: actionsName.DELTE_PRODUCT, payload: valueChekBox, user: userName.Id })
        }
    }
return (<>
    <Header />
    <h1>{state.Name}</h1>
    <img class="sad-rectangle" src={state.Img}></img>
    <div>
        {
            userName.Id === state.UserId ? <div>
                <button class="btn btn-secondary" onClick={() => navigate('/AddRecipes', { state })}>עדכון</button>
                <button class="btn btn-secondary" onClick={() => {
                dispatch({ type: actionsName.DELETE_RECIPE, Id: state.Id });
            }}>מחיקה</button>
            </div> : <div>זה לא המתכון</div>
        }
    </div>
    <p>רמת קושי:{state.Difficulty}</p>
    <p>זמן הכנה:{state.Duration}</p>
    {/* <p>קטגוריה:{state.}</p> */}
    <div> <h4>תיאור קצר</h4>
        <h6>{state.Description}</h6></div>
    <div>
        <h4>החומרים:</h4>
        <div>
            {
                state.Ingrident.map((x) => <> <div>{x.Name} {x.Count} {x.Type}</div>
                    <div>
                        <input
                            type="checkbox"
                            name={x.Name}
                            onChange={() => handleChange(x)} />
                    </div>
                </>
                )
            }
        </div>
        <div>
            <h4>הואות הכנה:</h4>
            <div>
                {state.Instructions.map(x => <p>{x}</p>)}
            </div>
        </div>
    </div>
</>)
}
export default ShowRecipe;