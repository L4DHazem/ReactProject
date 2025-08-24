import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from './Layout/Mainlayout'
import Authlayout from './Layout/Authlayout';
import Feedpage from './Pages/Feedpage';
import Profilepage from './Pages/Profilepage';
import Postdetails from './Pages/Postdetails';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Protectedroute from './Layout/Protectedroute';
import Notfoundpage from './Pages/Notfoundpage';
import Authprotectdroute from './Layout/Authprotectdroute';



const router = createBrowserRouter([

  {
    path: '', element: <Mainlayout />, children: [

      // use protected route to save route 

      { index: true, element: <Protectedroute><Feedpage/></Protectedroute> },
      { path: 'profile', element: <Protectedroute><Profilepage/></Protectedroute> },
      { path: 'post-details/:id', element: <Protectedroute><Postdetails/></Protectedroute>  },
      { path: '*', element: <Notfoundpage /> },
    ]
  },
  {
    path: '', element: <Authlayout />, children: [
      { path: 'register', element: <Authprotectdroute><Register /></Authprotectdroute> },
      { path: 'login', element: <Authprotectdroute><Login /></Authprotectdroute> },
    ]
  },

])

export default function App() {



  return <>

    <RouterProvider router={router} />

  </>

}

