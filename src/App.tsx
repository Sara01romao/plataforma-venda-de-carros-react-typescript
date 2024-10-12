import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { Car } from "./pages/car";
import { New } from "./pages/dashboard/new";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      
      {
        path:"/dashboard",
        element: <Dashboard/>,
      },
      {
        path:"/dashboard/new",
        element: <New/>,
      },
      {
        path:"/car/:id",
        element: <Car/>,
      }
     

    ]
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/register",
    element: <Register/>,
  },
  
]);


export default router;