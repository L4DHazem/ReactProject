import { Navbar as HerouNavbar, NavbarBrand, NavbarContent, NavbarItem, } from "@heroui/react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";


export default function Navbar() {


    const { islogged, setIslogged , setUserdata } = useContext(Authcontext)

    const navigate = useNavigate();
    function logout() {

        localStorage.removeItem('token');

        setIslogged(null);

        setUserdata(null);

        navigate('/Login')


    }





    return <>
        <HerouNavbar>
            <NavbarBrand>
                <NavLink className='font-bold' to={"/"}>Linked Posts</NavLink>
            </NavbarBrand>

            <NavbarContent justify="end">
                {islogged ? (
                    <>
                        {/* Profile link */}
                        <NavbarItem>
                            <NavLink to={"/profile"}>Profile</NavLink>
                        </NavbarItem>

                        {/* Logout button */}
                        <NavbarItem onClick={logout} className="cursor-pointer">
                            LogOut
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <NavLink to={"/register"}>Sign Up</NavLink>
                        </NavbarItem>

                        <NavbarItem>
                            <NavLink to={"/Login"}>Login</NavLink>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </HerouNavbar>
    </>




}
