
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import HomePage from './pages/Home'
import { SearchProvider } from './context/SearchContext'
import ExperienceDetailsPage from './pages/ExperienceDetail'
import CheckoutPage from './pages/CheckOutPage'
import ResultPage from './pages/ResultPage'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'



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
