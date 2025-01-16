import axios from "axios";

const USER_API = import.meta.env.VITE_BACKEND_URL + "/api/users";

const loginUser = (credentials) => {
    return axios.post(`${USER_API}/login`, credentials);
};
const registerUser = (account) => {
    return axios.post(`${USER_API}/register`, account);
};
export {
    loginUser,
    registerUser,
};
