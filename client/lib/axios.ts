import axios from "axios"

export const BASE_URL = "https://chatapp-kysv.onrender.com"

const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
})

export default clientServer