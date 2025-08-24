import { Button, Spinner } from '@heroui/react'
import React, { useState } from 'react'
import staticimg from '../assets/react.svg'
import { creatpostapi } from '../Services/Postservices';

export default function Creatpostcomp({ callback }) {


    const [postbody, setPostbody] = useState('');

    const [image, setImage] = useState(null);

    const [imageurl, setIamgeurl] = useState('');

    const [loading, setLoading] = useState(false);



    async function handlepost(e) {

        e.preventDefault();
        setLoading(true);

        const formdata = new FormData()

        formdata.append('body', postbody);
        formdata.append('image', image);

        const response = await creatpostapi(formdata);

        if (response.message) {
            await callback();
            setPostbody('');
            setIamgeurl('');
        }

        setLoading(false)
    }


    function handleImage(e) {


        setImage(e.target.files[0]);
        setIamgeurl(URL.createObjectURL(e.target.files[0]));



        e.target.value = '';


    }



    return <>


        <div className="bg-white relative rounded-md shadow-md py-3 px-3 my-5 overflow-hidden">

            <form onSubmit={handlepost}>

                <textarea value={postbody} onChange={(e) => setPostbody(e.target.value)} placeholder='Creat Post...' className='bg-gray-100 border w-full p-4 rounded-md resize-none' rows={4} name='' id=''></textarea>

                {imageurl && <div className='relative pb-2'>
                    <img src={imageurl} className='w-full' alt='' />
                    <svg onClick={() => setIamgeurl('')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>}

                <div className='flex justify-between items-center'>
                    <label className='cursor-pointer hover:text-blue-500 flex items-center gap-1'>

                        <input type='file' className='border hidden' onChange={handleImage} />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>


                        <span>image</span>


                    </label>



                    <Button type='submit' color='primary'>Post</Button>
                </div>
            </form>

            {loading && <div className="absolute flex justify-center items-center inset-0  bg-white-300/50">

                < Spinner />

            </div>}


        </div >



    </>

}
