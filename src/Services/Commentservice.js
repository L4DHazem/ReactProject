import axios from "axios";


export async function creatcommentapi(commentcontent, postid) {


    try {

        const { data } = await axios.post(`https://linked-posts.routemisr.com/comments `, {

            content : commentcontent,
            post : postid
        }, {

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