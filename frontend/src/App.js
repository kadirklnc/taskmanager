// src/App.js
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
import Permit from './Components/Pages/PermitPages/Permit';
import Report from './Components/Pages/Report';
import SignUp from './Components/LoginForm/SignUp';
import Employee from './Components/Pages/Empolyees';
import Departmans from './Components/Pages/Departments';
import PermitRouter from './Components/Pages/PermitPages/PermitRouter';
import PermitAllow from './Components/Pages/PermitPages/PermitAllow';
import PermitEmployees from './Components/Pages/PermitPages/PermitEmployees';
import PermitYears from './Components/Pages/PermitPages/PermitYears';
import AllPermits from './Components/Pages/PermitPages/AllPermits';
import MyPage from './Components/Pages/MyPage';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/homepage',
    element: (
      <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
        <Main />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'mypage',
        element: <MyPage />
      },
      {
        path: 'permit',
        element: (
          <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
            <PermitRouter />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <Permit />
          },
          {
            path: 'person',
            element: <PermitAllow />
          },
          {
            path: 'people',
            element: <PermitEmployees />
          },
          {
            path: 'years',
            element: <PermitYears />
          },
          {
            path: 'all',
            element: <AllPermits />
          }
        ]
      },
      {
        path: 'employes',
        element: (
          <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
            <Employee />
          </ProtectedRoute>
        )
      },
      {
        path: 'departmans',
        element: (
          <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
            <Departmans />
          </ProtectedRoute>
        )
      },
      {
        path: 'organization',
        element: <HomePage />
      },
      {
        path: 'inventory',
        element: <HomePage />
      },
      {
        path: 'travel',
        element: <HomePage />
      },
      {
        path: 'expense',
        element: <HomePage />
      },
      {
        path: 'report',
        element: (
          <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
            <Report />
          </ProtectedRoute>
        )
      },
      {
        path: 'settings',
        element: <HomePage />
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;



