import axios from "axios"

export const BASE_URL = "http://localhost:9090"

const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
})

export default clientServer