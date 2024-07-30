import axios from 'axios';
import useTokenStore from '../store';

const api=axios.create(
    {
        baseURL: 'http://localhost:5050',
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

api.interceptors.request.use((config)=>{
    const token=useTokenStore.getState().token;
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})
export const login=async (data:{email:string,password:string}) => {
    return api.post('/auth/signing',data)
}

export const register=async (data:{name:string,email:string,password:string}) => {
    return api.post('/auth/signup',data)
}

export const getBooks=async()=>api.get('/books')

export const createBook=async(data:FormData)=>{
    return api.post('/books',data,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}