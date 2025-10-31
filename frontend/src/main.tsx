
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home.tsx';
import {SearchProvider} from './context/SearchContext.tsx';
import ExperienceDetailsPage from './pages/ExperienceDetail.tsx';
import CheckoutPage from './pages/CheckOutPage.tsx';
import ResultPage from './pages/ResultPage.tsx';


const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      {path: '/experience/:id', element:<ExperienceDetailsPage/> } ,
      {path: '/checkout', element:<CheckoutPage/> },
      {path: '/confirmation', element:<ResultPage/> },


  ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <SearchProvider>
    <RouterProvider router={appRoutes} />
  </SearchProvider>
)
