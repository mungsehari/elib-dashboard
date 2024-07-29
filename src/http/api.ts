import axios from 'axios';

const api=axios.create(
    {
        baseURL: 'http://localhost:5050',
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

export const login=async (data:{email:string,password:string}) => {
    return api.post('/auth/signing',data)
}

export const register=async (data:{name:string,email:string,password:string}) => {
    return api.post('/auth/signup',data)
}

export const getBooks=async()=>api.get('/books')