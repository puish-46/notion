import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import DashBoard from "./components/DashBoard";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Task from "./components/Task"
import Journal from "./components/Journal"
import Page from "./components/Page"
import Search from "./components/Search";
import HomeDashBoard from "./components/HomeDashBoard";

function App() {

    const routerObj=createBrowserRouter([
        {
            path:"/",
            element: <RootLayout/>,
            children:[
                {
                    path:"",
                    element:<Home/>
                },
                {
                    path:"register",
                    element:<Register/>
                },
                {
                    path:"login",
                    element:<Login/>
                },
            ],
        },
        {
            path:"dashboard",
            element:<DashBoard/>,
            children:[
                {
                    index:true,
                    element:<Profile/>
                },
                {
                    path:"profile",
                    element:<Profile/>
                },
                {
                    path:"task",
                    element:<Task/>
                },
                {
                    path:"journal",
                    element:<Journal/>
                },
                {
                    path:"page",
                    element:<Page/>
                },
                {
                    path:"search",
                    element:<Search/>
                },
                {
                    path:"dashboardhome",
                    element:<HomeDashBoard/>
                }
            ]     
        }
    ])

  return (
    <div>
        <RouterProvider router={routerObj} />
    </div>
  )
}

export default App