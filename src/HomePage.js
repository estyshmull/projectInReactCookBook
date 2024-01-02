import { Route } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './bootstrap.min.css';
const HomePage=()=>{
    const navigate=useNavigate();

    return(
        <>
        <h1>my cookBook</h1>
        <button  class="btn btn-danger" onClick={()=>navigate('/Login')}>Login</button>
        <button  class="btn btn-danger" onClick={()=>navigate('/Signin')}>Signin</button>
        </>
    )
    }
    export default HomePage;