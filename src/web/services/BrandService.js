import axios from "axios";
const Brand_API = import.meta.env.VITE_BACKEND_URL + "/api/brands";
const getBrands = () => {
    return axios.get(`${Brand_API}`)
}
export {
    getBrands,
}