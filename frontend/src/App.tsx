
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
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
