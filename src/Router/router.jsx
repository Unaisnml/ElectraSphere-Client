import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/HomePage'
import SingleProduct from '../pages/SingleProduct'



const router = createBrowserRouter([
    {path:'/'  , element:<App/>,
children:[
    {path:'/' , element: <HomePage/>},
    {path:'/products/:id' , element: <SingleProduct/>}
]}
])

export default router