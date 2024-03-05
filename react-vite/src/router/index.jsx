import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import BusinessForm from '../components/BusinessForm';
import BusinessDetails from '../components/BusinessDetails';
import EditBusiness from '../components/EditBusiness';
import UserBusinesses from '../components/UserBusinesses';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: '/business/new',
        element: <BusinessForm />
      },
      {
        path: '/business/:businessId',
        element: <BusinessDetails />
      },
      {
        path: '/business/:businessId/edit',
        element: <EditBusiness />
      },
      {
        path: 'businesses/manage',
        element: <UserBusinesses />
      }
    ],
  },
]);