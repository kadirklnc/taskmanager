import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/LoginForm/login';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Main from './Components/Common/Main';
import HomePage from './Components/Pages/HomePage';
import Permit from './Components/Pages/Permit'
import Report from './Components/Pages/Report'
import SignUp from './Components/LoginForm/SignUp';
import Employee from './Components/Pages/Empolyees';
import Departmans from './Components/Pages/Departments';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },

  {
    path: '/signup',
    element: <SignUp/> // Add route for SignUp
  },

  {
    path: '/homepage',
    element: <Main/>,
    children:[
      {
        path:'',
        element:<HomePage/>
      },
      {
        path:'permit',
        element:<Permit/>
      },{
        path:'employes',
        element:<Employee/>
      },{
        path:'departmans',
        element:<Departmans/>
      },{
        path:'organization',
        element:<HomePage/>
      },{
        path:'inventory',
        element:<HomePage/>
      },{
        path:'travel',
        element:<HomePage/>
      },{
        path:'expense',
        element:<HomePage/>
      },{
        path:'report',
        element:<Report/>
      },{
        path:'settings',
        element:<HomePage/>
      }
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;
