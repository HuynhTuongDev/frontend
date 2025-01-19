import axios from "axios";

// Sử dụng đúng cú pháp cho biến môi trường trong Vite
const PRODUCT_API = import.meta.env.VITE_BACKEND_URL + "/api/products";

const getProductByQuery = (query) => {
    return axios.get(`${PRODUCT_API}/${query}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Error fetching product by query:', error);
            throw error;
        });
}
// Hàm lấy tất cả sản phẩm
const getAllProducts = async () => {
    try {
        const response = await axios.get(PRODUCT_API);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error.response || error.message);
        throw new Error('Lỗi khi lấy dữ liệu sản phẩm');
    }
};

// Hàm lấy sản phẩm theo ID thương hiệu
const getByBrandID = async (brandID) => {
    try {
        const response = await axios.get(`${PRODUCT_API}/brand/${brandID}`);
        return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm theo thương hiệu:", error.response || error.message);
        throw new Error('Lỗi khi lấy dữ liệu sản phẩm theo thương hiệu');
    }
};

// Hàm lấy sản phẩm theo ID danh mục
const getByCategoryID = async (categoryID) => {
    try {
        const response = await axios.get(`${PRODUCT_API}/category/${categoryID}`);
        return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm theo danh mục:", error.response || error.message);
        throw new Error('Lỗi khi lấy dữ liệu sản phẩm theo danh mục');
    }
};

// Hàm lấy sản phẩm theo nhiều tham số
const getProductsByQuery = async (queryParams) => {
    try {
        const params = new URLSearchParams(queryParams).toString(); // Dễ dàng xử lý nhiều tham số
        const response = await axios.get(`${PRODUCT_API}/${params}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo tham số:", error.response || error.message);
        throw new Error('Lỗi khi lấy sản phẩm theo tham số');
    }
};

export {
    getProductByQuery,
    getAllProducts,
    getByBrandID,
    getByCategoryID,
    getProductsByQuery,
};
