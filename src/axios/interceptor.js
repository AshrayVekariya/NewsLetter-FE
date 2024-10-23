import axios from 'axios'
import { getCookie } from 'cookies-next';

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URI}/api/`
})

// REQUEST //
instance.interceptors.request.use(
    function (config) {
        const accessToken = getCookie('accessToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// RESPONSE //
instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default instance
