import axios from "axios";

// Sử dụng đúng cú pháp cho biến môi trường trong Vite
const PRODUCT_API = import.meta.env.VITE_BACKEND_URL + "/api/products";

const getProductByQuery = (query) => {
    return axios.get(`${PRODUCT_API}/${query}`)
        .then(response => {
            console.log('Get Product by Query Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching product by query:', error);
            throw error;
        });
}
const getAllProduct = () => {
    return axios.get(`${PRODUCT_API}/allproducts`);
}



export {
    getProductByQuery,
    getAllProduct,
}
