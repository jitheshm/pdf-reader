
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Landing from './pages/Landing'

function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/",
      element: <Landing />
    }
  ])

  return (

    <RouterProvider router={router} />

  )
}

export default App
