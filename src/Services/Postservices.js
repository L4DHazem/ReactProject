import axios from "axios";


export default /*default async */ function getallpostsapi() {


    

        return axios.get('https://linked-posts.routemisr.com/posts?limit=10', {

            headers: {

                token: localStorage.getItem('token')
            },

            params: {
                limit: 5,
                sort: '-createdAt'
            }
        })
}

export async function getsinglepostapi(id) {


    try {

        const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id} `, {

            headers: {

                token: localStorage.getItem('token')
            }
        })

        console.log(data);

        return data


    } catch (err) {


        console.log(err);

    }
}

export async function creatpostapi(formdata) {


    try {

        const { data } = await axios.post(`https://linked-posts.routemisr.com/posts `, formdata , {

            headers: {

                token: localStorage.getItem('token')
            }
        })

        console.log(data);

        return data


    } catch (err) {


        console.log(err);

    }
}

