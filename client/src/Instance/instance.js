import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
    withCredentials: true
});

export default axiosInstance;
