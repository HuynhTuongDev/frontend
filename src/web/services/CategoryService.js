import axios from "axios";
const Category_API = import.meta.env.VITE_BACKEND_URL + "/api/categories";
const getCategories = () => {
    return axios.get(`${Category_API}`)
}
export {
    getCategories,
}