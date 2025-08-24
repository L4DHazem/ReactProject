import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Authcontext } from '../Context/Authcontext'

export default function Protectedroute({children}) {

    let {islogged} = useContext(Authcontext)



    return islogged? children : <Navigate to={'/Login'}/>


}
