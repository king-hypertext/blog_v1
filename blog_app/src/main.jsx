import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import Login from './pages/Login.jsx'
import GuestLayout from './layout/Guest.jsx'
import { ContextProvider } from './utilities/ContextProvider.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const app_routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'auth',
    element: <GuestLayout/>,
    children: [{
      path: '/auth/create-account',
      element: <CreateAccount />,
    },
    {
      path: '/auth/login',
      element: <Login />,
    }],
    errorElement: 'error'
  }
]);
createRoot(document.getElementById('app')).render(
  <ContextProvider>
    <StrictMode>
      <RouterProvider router={app_routes} />
    </StrictMode>
  </ContextProvider>
);
