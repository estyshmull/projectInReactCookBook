// import React, { useState } from 'react';

// const MyComponent = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [customOption, setCustomOption] = useState('');
  
//   const options = ['Option 1', 'Option 2', 'Option 3'];

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleCustomOptionChange = (event) => {
//     setCustomOption(event.target.value);
//   };

//   const handleAddCustomOption = () => {
//     if (customOption.trim() !== '') {
//       setSelectedOption(customOption);
//       setCustomOption('');
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="mySelect">Choose an option:</label>
//       <select id="mySelect" value={selectedOption} onChange={handleSelectChange}>
//         {options.map((option, index) => (
//           <option key={index} value={option}>{option}</option>
//         ))}
//         <option value="custom">Custom...</option>
//       </select>

//       {selectedOption === 'custom' && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter a custom option"
//             value={customOption}
//             onChange={handleCustomOptionChange}
//           />
//           <button onClick={handleAddCustomOption}>Add</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyComponent;



import axios from "axios";
import { getRecipes, getCtegory } from './actions'
import * as actiontype from './actions'
const initialState = {
    userId: null,
    recipes: [],
    selected: null

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontype.LOD_OUT: return { ...state, userId: null, selected: null, recipes: [] }
            break;
        case actiontype.LON_IN: return { ...state, userId: action.UserId }
            break;
        case actiontype.GET_RECIPES:
            const recipes = [...state.recipes];
            recipes.push(action.recipe);
            console.log(recipes);
            return { ...state, recipes: recipes };
            break;
        case actiontype.ADD_RECIPE:
            axios.post(`http://localhost:8080/api/recipe`, action.add)
                .then((x) => {
                    alert(" נוסף ");
                }).catch(() => alert("שגיאה "));
            return { ...state, recipes: [...state.recipes, action.add] }
        case actiontype.DELETE_RECIPE: axios.post(`http://localhost:8080/api/recipe/delete/${action.Id}`)
            .then((x) => {
                alert("  נמחק");
            })
            .catch(() => alert("שגיאה "));
            return { ...state }
        case actiontype.EDIT_RECIPE: 
            axios.post(`http://localhost:8080/api/recipe/edit`, action.add)
                .then((x) => {
                    alert("עודכן ");
                }).catch((data) => alert(data.error.m));
            return { ...state }
        case actiontype.SET_CATEGORY: return { ...state ,selected:action.selected}

        default: return { ...state}
    }


}