import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
const UpDate_Delete = () => {

    const { state } = useLocation();


    // const Delete_recipe = () => {
    //     axios.post('http://localhost:8080/api/recipe/delete',state.Id)
    //         .then((res) => {
    //             alert("the recipe deleted");
    //         })
    //         .catch(er => { alert(er) })
    // }
}

export default UpDate_Delete;