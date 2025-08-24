
import React, { useContext, useState } from 'react'
import { Button, Input } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as  zod from 'zod'
import { sendlogindata } from '../Services/authservices';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../Context/Authcontext';


// zod resolver 

const schema= zod.object({

    
    email: zod.string().nonempty('Email is required') 
        .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,'email is invalid '),

    password: zod.string().nonempty('password is required')

    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password is invalid '),


})



//use form for validation 

export default function Login() {

    const [Loading, setLoading]= useState(false)
    const [apierror, setApierror]= useState(null)

    const { handleSubmit, register, formState:{errors} } = useForm({

        defaultValues: {

            email: '',
            password: '',

        },

        resolver: zodResolver(schema),

        //on blur 
        mode:'onBlur',
        reValidateMode:'onBlur'
    })

    

// to call api and handle error 

const navigate= useNavigate();


// use context

const {setIslogged} = useContext(Authcontext)

   async function signup(userdata) {

    setLoading(true)

        const response = await sendlogindata(userdata)

        if(response.message){

            // storage token 

            localStorage.setItem('token', response.token);

            setIslogged(response.token)

            navigate('/')


        }else{

            setApierror(response.error)
        }

        setLoading(false)

    }


    return <>



        <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>

            <h1 className='text-2xl text-center mb-4'>Login Now</h1>


            <form onSubmit={handleSubmit(signup)} className='flex flex-col gap-4'>

                
                <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
                <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} variant='bordered' label="Password" {...register('password')} type="password" />


                <Button isLoading={Loading} type='submite'>Login</Button>

                <div>if you haven't account please , <Link to={'/register'} className='text-blue-500'>Sign up</Link></div>

                {apierror && <span className='text-center text-red-500'>{apierror}</span>}

            </form>
        </div>

    </>

}