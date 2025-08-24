import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

export default function Mainlayout() {
    return <>

        <Navbar/>

        <div className='bg-gray-100 pt-4 pb-3 min-h-screen'>

        <Outlet/>

        </div>

        <Footer/>



    </>

}
