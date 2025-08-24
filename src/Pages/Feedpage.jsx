import React, { useEffect, useState } from 'react'
import Postcard from '../Components/Postcard';
import getallpostsapi from '../Services/Postservices';
import Loadingscreen from '../Components/Loadingscreen';
import Creatpostcomp from '../Components/Creatpostcomp';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@heroui/react';



export default function Feedpage() {

    // const [posts, setPosts] = useState([])

    // async function getallposts() {


    //     const response = await getallpostsapi();

    //     setPosts(response.posts)
    // }


    // useEffect(() => {

    //     getallposts()

    // }, [])

    const { data, isLoading, isFetching, isError, error, refetch } = useQuery({

        queryKey: ['posts'],

        queryFn: getallpostsapi,

        // retry: 2,

        // retryDelay: 5000,

        // refetchOnMount: false,

        // refetchOnWindowFocus: false,

        // refetchOnReconnect: false,

        // gcTime: 5000,

        // staleTime: 10000,

        // refetchInterval: 3000,

    })

    console.log(data?.data.posts);





    return <>

        {/* <div className="w-2xl mx-auto">

            <Creatpostcomp callback={getallposts}/>


            {posts.length==0? <Loadingscreen /> : posts.map((post) => <Postcard key={post.id} post={post} commentlimit={1} callback={getallposts} />)}


        </div> */}

        <div className="w-2xl mx-auto">

            <Creatpostcomp callback={refetch} />

            {isLoading ? (
                <Loadingscreen />
            ) : isError ? (
                <div className="text-center">
                    <h2 className="text-4xl py-10">{error?.message || 'Network Error'}</h2>

                    {/* <Button onPress={refetch}>Retry</Button> */}

                </div>
            ) : (
                data?.data.posts.map((post) => (
                    <Postcard key={post.id} post={post} commentlimit={1} callback={refetch} />
                ))
            )}

        </div>
    </>

}
