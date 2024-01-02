import { Route } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
const Header=()=>{
    const navigate=useNavigate();
    return(
        <>
        <button  class="btn btn-danger" onClick={()=>navigate('/Home')}>דף הבית</button>
        <button  class="btn btn-danger" onClick={()=>navigate('/Login')}>החלף משתמש</button>
        {/* אולי צריך להוריד את אופצית ההרשמה אחרי שהמשתמש נכנס למערכת  */}
        <button  class="btn btn-danger" onClick={()=>navigate('/Signin')}>הרשמה</button>
        <button  class="btn btn-danger" onClick={()=>navigate('/Recipes')}>מתכונים</button>
        <button  class="btn btn-danger" onClick={()=>navigate('/Shoping')}>רשימת הקניות שלי</button>
        </>
    )
}
export default Header;
