import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState, useEffect } from "react";
import * as actionsName from './store/action';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"


const Select = ({ onChange, options, name, label, value }) => (
  <>
    <label>{label}</label>
    <select name={name} onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option.Id}>{option.Name}</option>
      ))}
    </select>
  </>
);

const CategoriseComponnent = ({selectedCategory, onChange}) => {
  const allCategories = useSelector((state) => state.categories)
  const [categorise, setCategorise] = useState(allCategories);
  const [cat, setCat] = useState('');
  const { state } = useLocation();
 
  const schema = yup
    .object({
      cat: yup.string().required(),
    })
    .required()
  const {
    register,
  } = useForm({
    resolver: yupResolver(schema),
  })


  // const AddCategiry = () => {

  //     const onSubmit = (data) => {
  //         alert("הקטגוריה התווספה בהצלחה!",data);
  //         axios.post('http://localhost:8080/api/category', data)
  //             .then((x) => {
  //                 dispatch({ type: actionsName.ADD_CATEGORY, payload: x.data })
  //             }
  //             )
  //             .catch(x => alert("הקטגוריה לא התווספה"))
  //     }
  //     const {
  //         register,
  //         handleSubmit,
  //         formState: { errors },
  //     } = useForm({
  //         resolver: yupResolver(schema),
  //     })
  //     return (
  //         <>
  //             <form onSubmit={handleSubmit(onSubmit)}>
  //                 <input placeholder="CategoryName" {...register("CategoryName")} />
  //                 <p>{errors.CategoryName?.message}</p>
  //                 <input type="submit" />
  //             </form>
  //         </>)
  // }

  const onC = (e) => {
    onChange(e.target.value);
  }
  return (<>
    {categorise.length > 0 ? (
      <Select label="קטגורית" {...register("Categories")} value={selectedCategory ? selectedCategory: categorise[0]} options={categorise} onChange={onC} />
    ) : (
      <p>טוען קטגוריות...</p>
    )}
  </>)
}
export default CategoriseComponnent;



