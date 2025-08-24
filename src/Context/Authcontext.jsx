import { createContext, useEffect, useState } from "react";
import { getuserdataapi } from "../Services/authservices";

export const Authcontext = createContext();


export default function AuthContextProvider({ children }) {

    const [islogged, setIslogged] = useState(localStorage.getItem('token') != null);

    const [userdata, setUserdata] = useState(null);

    async function getloggeduserdata() {

        const response = await getuserdataapi();

        if (response.message) {

            setUserdata(response.user)
        }

    }

    useEffect(() => {
        if(islogged){

            getloggeduserdata();
        }

    }, [islogged])


    return <Authcontext.Provider value={{ islogged, setIslogged , userdata , setUserdata }}>

        {children}
    </Authcontext.Provider>




}