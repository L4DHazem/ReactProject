import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from './../Components/Footer';

export default function Authlayout() {
    return <>

        <Navbar />

        <div className="min-h-screen flex justify-center items-center bg-gray-100 ">

            <Outlet />


        </div>



    </>

}
