import React, { useState } from 'react'

import { Button, Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as  zod from 'zod'
import { sendregisterdata } from '../Services/authservices';
import { Link, useNavigate } from 'react-router-dom';

// zod resolver 

const schema= zod.object({

    name: zod.string().nonempty('name is required')

            .min(3,'name at least 3 ch')
            .max(10,'name max 10 ch '),
    email: zod.string().nonempty('Email is required') 
        .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,'email is invalid '),

    password: zod.string().nonempty('password is required')

    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password is invalid '),

    rePassword: zod.string().nonempty('repassword is required'),

    dateOfBirth: zod.coerce.date('Date is required').refine((value)=>{

        const userage= value.getFullYear();
        const now = new Date().getFullYear();
        const diff= now - userage;

        return diff >=18
    }, 'age must be greater than 18 '),

    gender: zod.string().nonempty('Gender is required')

}).refine((data)=> data.password===data.rePassword , {path:['repassword'],message:'password and repassword doesnt rematch'});



//use form for validation 

export default function Register() {

    const [Loading, setLoading]= useState(false)
    const [apierror, setApierror]= useState(null)

    const { handleSubmit, register, formState:{errors} } = useForm({

        defaultValues: {

            name: '',
            email: '',
            password: '',
            rePassword: '',
            dateOfBirth: '',
            gender: ''

        },

        resolver: zodResolver(schema),

        //on blur 
        mode:'onBlur',
        reValidateMode:'onBlur'
    })

    

// to call api and handle error 

const navigate= useNavigate();

   async function signup(userdata) {

    setLoading(true)

        const response = await sendregisterdata(userdata)

        if(response.message){

            navigate('/Login')


        }else{

            setApierror(response.error)
        }

        setLoading(false)

    }


    return <>



        <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>

            <h1 className='text-2xl text-center mb-4'>Register Now</h1>


            <form onSubmit={handleSubmit(signup)} className='flex flex-col gap-4'>

                <Input isInvalid={Boolean(errors.name)} errorMessage={errors.name?.message} variant='bordered' label="Name" 
                {...register('name')} type="text" />
                {/* {errors.name && <p>{errors.name?.message}</p>} */}
                <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
                <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} variant='bordered' label="Password" {...register('password')} type="password" />
                <Input isInvalid={Boolean(errors.rePassword)} errorMessage={errors.rePassword?.message} variant='bordered' label="Reoassword" {...register('rePassword')} type="password" />

                <div className="flex gap-2">
                    <Input isInvalid={Boolean(errors.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} variant='bordered' label="DateOfBirth" {...register('dateOfBirth')} type="date" />

                    <Select isInvalid={Boolean(errors.gender)} errorMessage={errors.gender?.message} variant='bordered' label="Select an animal" {...register('gender')}>

                        <SelectItem key={'male'}>Male</SelectItem>
                        <SelectItem key={'female'}>Female</SelectItem>

                    </Select>
                </div>

                <Button isLoading={Loading} type='submite'>Register</Button>

                <div>if you have account please , <Link to={'/Login'} className='text-blue-500'>Login</Link></div>

                {apierror && <span className='text-center text-red-500'>{apierror}</span>}

            </form>
        </div>

    </>

}


// ,{required : 'Name is required', minLength:{value:3,message:'name at least 3 ch'},maxLength:{value: 10, message:'name at maximium 10 ch'},pattern:{value:'^[a-zA-Z\s]+$'}})