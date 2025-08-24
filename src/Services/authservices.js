import axios from "axios";


export async function getuserdataapi() {

    try {
        let { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {

            headers: {

                token: localStorage.getItem('token')
            }
        })

        console.log(data);

        return data
    } catch (error) {

        console.log(error.response.data);

        return error.response.data
    }


}

export async function sendregisterdata(userdata) {

    try {
        let { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userdata)

        console.log(data);

        return data
    } catch (error) {

        console.log(error.response.data);

        return error.response.data
    }


}

export async function sendlogindata(userdata) {

    try {
        let { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', userdata)

        console.log(data);

        return data
    } catch (error) {

        console.log(error.response.data);

        return error.response.data
    }


}