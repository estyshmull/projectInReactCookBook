import axios from 'axios'
import * as actionsName from './action'
const inaslaseState = {
    user: null,
    recipes: [],
    shoppingCart: [],
    categories: []
}
const Reducer = (state = inaslaseState, action) => {
    switch (action.type) {
        case actionsName.SET_USER: {
            return { ...state, user: action.user }
        }
        case actionsName.SET_RECIPES: {
            return { ...state, recipes: action.payload }
        }
        case actionsName.GET_USER: {
            return state.user;
        }
        case actionsName.GET_RECIPES: {
            return state.recipes;
        }
        case actionsName.ADD_RECIPES: {
            const recipe = action.payload
            state.recipes.push(action.payload)
            return {
                ...state, recipe
            }
        }
        case actionsName.EDITE_RECIPES: {
            return { ...state, payload: action.user }
        }
        case actionsName.ADD_CATEGORY: {
            const cat = action.payload
            state.categories.push(action.payload)
            return {
                ...state, cat
            }
        }
        case actionsName.ADD_PRODUCT: {
            const p = action.payload;
            const t = { ...p, userId: action.user.Id }
            axios.post('http://localhost:8080/api/bay', t)
                .then(x => console.log(x))
                .catch(er => er)
        }
        case actionsName.ADD_SHOPPING_CART:
            {
                return { ...state, shoppingCart: action.payload }
            }

        case actionsName.DELTE_PRODUCT:
            {
                const p = action.payload
                axios.post(`http://localhost:8080/api/bay/${action.user.Id}/${p}`)
                    .then(x => console.log("נמחק בהצלחה", x))
                    .catch(er => er)
            }
        case actionsName.GET_CATEGOIES:
            {
                return { ...state, categories: action.payload }
            }
            case actionsName.DELETE_RECIPE:
                 axios.post(`http://localhost:8080/api/recipe/delete/${action.Id}`)
            .then((x) => {
                alert("  נמחק");
            })
            .catch(() => alert("שגיאה "));
            return { ...state }
        default: return { ...state }
    }
}
export default Reducer;