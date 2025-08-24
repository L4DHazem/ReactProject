import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getsinglepostapi } from '../Services/Postservices'
import Postcard from '../Components/Postcard';
import Loadingscreen from '../Components/Loadingscreen';

export default function Postdetails() {

    let { id } = useParams();

    const [post, setPost] = useState(null)

    async function getpost() {

        const response = await getsinglepostapi(id);

        if (response.message) {

            setPost(response.post)
        }

    }

    useEffect(() => {

        getpost()
    }, [id])


    return <>

        <div className='w-4/6 mx-auto'>

            {post ? <Postcard post={post} commentlimit={post.comments.length} /> : <Loadingscreen />}

        </div>

    </>
}
