import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import BusinessForm from '../components/BusinessForm';
import BusinessDetails from '../components/BusinessDetails';
import EditBusiness from '../components/EditBusiness';
import UserBusinesses from '../components/UserBusinesses';
import AllBusinesses from '../components/AllBusinesses/AllBusinesses';
import UserReviews from '../components/UserReviews/UserReviews';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>The bottom half of this page is coming soon!!</h1>,
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
      },
      {
        path: 'businesses',
        element: <AllBusinesses />
      },
      {
        path: 'reviews/manage',
        element: <UserReviews />
      },
      {
        path: '*',
        element: <h2>Page Not Found</h2>
      }
    ],
  },
]);