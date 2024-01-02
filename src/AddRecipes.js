
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import React, { useEffect } from "react"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import * as actionsName from './store/action';
import axios from "axios";
import Header from "./Header";
import CategoriseComponnent from "./CategoriesComponnent";

const Select = React.forwardRef(({ onChange, onBlur, name, label, categorise, value }, ref) => (
    <>{
        <div>
            <label>{label}</label>
            <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} value={value}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>

    }
    </>
))

const schema = yup
    .object({
        Description: yup.string().required(),
        nameRecipe: yup.string().required(),
    })
    .required()


const AddRecipes = () => {
    const setAllCat=useSelector((state)=>state.categories);

    let flag = false;
    const [recipeName, setRecipeName] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [defficult, setDefficult] = useState("");
    const [duraiton, setDuraiton] = useState("");
    const [descraption, setDescraption] = useState("");
    const [selectedCtegory, setSelectedCtegory] = useState(setAllCat[0]);
    const [products, setProducts] = useState([]);
    const { state } = useLocation();
    const userName = useSelector((state) => state.user.Username);
    const dispatch = useDispatch();

 console.log("setAllCat",setAllCat);
    useEffect(() => {
        if (state) {
            setRecipeName(state.Name);
            setInstructions(state.Instructions);
            setDefficult(state.Difficulty);
            setDuraiton(state.Duration);
            setDescraption(state.Description);
            setSelectedCtegory(setAllCat.find(s=> s.Id === state.CategoryId));
            setProducts(state.Ingrident);
            flag = true;
        }
    }, [state])
    const [id, setId] = useState(0);

    const handleAddProduct = () => {
        const newProduct = {
            id: id,
            name: "",
            quantity: "",
            type: "",
        };
        setProducts([...products, newProduct]);
        setId(id + 1);
    };

    const handleAddInstruction = () => {
        const newInstruction = {
            description: "",
        };
        setInstructions([...instructions, newInstruction]);
    };
    const renderProducts = () => {
        return products.map((product, index) => {
            return (
                <div key={product.id}>
                    <input  class="btn btn-secondary" placeholder="productName" type="text" name="productName" defaultValue={product.Name} onChange={(e) => { const p = products; p[index] = { ...p[index], Name: e.target.value }; setProducts(p) }} />
                    <input  class="btn btn-secondary" placeholder="productQuantity" type="number" name="productQuantity" defaultValue={product.Count} onChange={(e) => { const p = products; p[index] = { ...p[index], Count: e.target.value }; setProducts(p) }} />
                    <input  class="btn btn-secondary" placeholder="type" type="text" name="type" defaultValue={product.Type} onChange={(e) => { const p = products; p[index] = { ...p[index], Type: e.target.value }; setProducts(p) }} />
                    
                </div>
            );
        });
    };

    const renderInstructions = () => {
        return instructions.map((instruction, index) => {
            return (
                <div key={instruction.name}>
                    <input  class="btn btn-secondary" placeholder="instructions" type="text" name="instructions" defaultValue={instruction} onChange={(e) => { const p = instructions; p[index] = { ...p[index], Name: e.target.value }; setProducts(p) }} />
                </div>
            );
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })


    const onSubmit1 = (data) => {
        alert("המתכון התעדכן בהצלחה");
        axios.post('http://localhost:8080/api/recipe/edit', data)
            .then((x) =>
                dispatch({ type: actionsName.EDITE_RECIPES, payload: data })).catch(er => er.errors)
    }
    const onSubmit2 = (data) => {
        alert("התווסף מתכון חדש");
        axios.post('http://localhost:8080/api/recipe', data)
            .then((x) =>
                dispatch({ type: actionsName.ADD_RECIPES, payload: data })).catch(er => er.errors)
    }
    return (
        <>
            {/* צריך להדגיש את כפתור של הדף הנוכחי  */}
            <Header />
            <h2>מחבר המתכון הוא:{userName}</h2>
            <form onSubmit={flag ? handleSubmit(onSubmit1) : handleSubmit(onSubmit2)}>

                <input  class="btn btn-secondary" placeholder="שם המתכון" {...register("nameRecipe")} name="nameRecipe" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                <p>{errors.nameRecipe?.message}</p>

                <p>משך זמן הכנה:{duraiton} דקות</p>
                <input  class="btn btn-secondary slider" type="range" min="1" max="120" style={{ color: "black" }} onChange={event => {
                    setDuraiton(event.target.value);
                }} />
                <Select label="רמת קושי" {...register("Difficulty")} value={defficult} onChange={(e) => setDefficult(e.target.value)} />

                
              {/* הקומפוננטה לא עובדת!!!! */}
                <CategoriseComponnent selectedCategory={selectedCtegory} onChange={(val)=> setSelectedCtegory(val)}/>
                <textarea
                    placeholder="תאור קצר"
                    rows="10"
                    cols="50"
                    style={{
                        color:"black",
                        width: "70px",
                        height: "100px",
                        fontFamily: "Arial",
                         fontSize: "16px",}} {...register("Description")} value={descraption}  name="Description"  onChange={(e) => setDescraption(e.target.value)}></textarea>
            <p>{errors.Description?.message}</p>

            <div>
                <h2>מוצרים</h2>
                {renderProducts()}
                <button onClick={handleAddProduct}>הוסף מוצר</button>

            </div>
            <div>
                <h2>הוראות</h2>
                {renderInstructions()}
                <button  class="btn btn-danger" onClick={handleAddInstruction}>הוסף הוראות</button>
            </div>

            <input  class="btn btn-danger"  type="submit" />
        </form>
        </>

    )
}
export default AddRecipes;