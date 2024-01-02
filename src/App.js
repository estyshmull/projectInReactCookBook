
import { Route,Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signin from './Signin';
import Recipes from './Recipes';
import Shoping from './Shoping';
import HomePage from './HomePage';
import Header from './Header';
import ShowRecipe from './ShowRecipe';
import UpDate_Delete from './UpDate_Delete' 
import AddRecipes from './AddRecipes'
function App() {

  return (
   <>
   <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Signin' element={<Signin />} />
      <Route path='/Recipes' element={<Recipes />} />
      <Route path='/Shoping' element={<Shoping />} />
      <Route path='/ShowRecipe' element={<ShowRecipe />} />
      <Route path='/UpDate_Delete' element={<UpDate_Delete />} />
      <Route path='/AddRecipes' element={<AddRecipes />} />
    </Routes>
    </> 
  );
}

export default App;
