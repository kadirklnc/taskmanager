import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/LoginForm/login';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Main from './Components/Common/Main';
import HomePage from './Components/Pages/HomePage';
import Permit from './Components/Pages/PermitPages/Permit'
import Report from './Components/Pages/Report'
import SignUp from './Components/LoginForm/SignUp';
import Employee from './Components/Pages/Empolyees';
import Departmans from './Components/Pages/Departments';
import PermitRouter from './Components/Pages/PermitPages/PermitRouter';
import PermitAllow from './Components/Pages/PermitPages/PermitAllow';
import PermitEmployees from './Components/Pages/PermitPages/PermitEmployees';
import PermitYears from './Components/Pages/PermitPages/PermitYears';
import AllPermits from './Components/Pages/PermitPages/AllPermits';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/homepage',
    element: <Main/>,
    children:[
      {
        path: '',
        element: <HomePage/>
      },
      {
        path: 'permit',
        element: <PermitRouter/>,
        children:[
          {
            path: '',
            element: <Permit/>
          },
          {
            path: 'person',
            element: <PermitAllow/>
          },
          {
            path: 'people',
            element: <PermitEmployees/>
          },
          {
            path: 'years',
            element: <PermitYears/>
          },
          {
            path: 'all',
            element: <AllPermits/>
          }
        ]
      },
      {
        path: 'employes',
        element: <Employee/>
      },
      {
        path: 'departmans',
        element: <Departmans/>
      },
      {
        path: 'organization',
        element: <HomePage/>
      },
      {
        path: 'inventory',
        element: <HomePage/>
      },
      {
        path: 'travel',
        element: <HomePage/>
      },
      {
        path: 'expense',
        element: <HomePage/>
      },
      {
        path: 'report',
        element: <Report/>
      },
      {
        path: 'settings',
        element: <HomePage/>
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
