import axios from "axios";

const BANNER_API = import.meta.env.VITE_BACKEND_URL + "/api/slider"
const getSlider = () => {
    return axios.get(`${BANNER_API}`)
}
export { getSlider }