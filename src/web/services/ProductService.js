import axios from "axios";

// Sử dụng đúng cú pháp cho biến môi trường trong Vite
const PRODUCT_API = import.meta.env.VITE_BACKEND_URL + "/api/products";
const COLLECTION_API = import.meta.env.VITE_BACKEND_URL + "/api/collections";

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
        const response = await axios.get(COLLECTION_API);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error.response || error.message);
        throw new Error('Lỗi khi lấy dữ liệu sản phẩm');
    }
};

// Hàm lấy sản phẩm theo ID thương hiệu hoặc ID danh mục
const getProductsByFilter = async (filterType, filterID) => {
    try {
        let url = '';

        // Xây dựng URL theo loại bộ lọc
        if (filterType === 'brand' && filterID) {
            url = `${COLLECTION_API}?brand=${encodeURIComponent(filterID)}`;
        } else if (filterType === 'category' && filterID) {
            url = `${COLLECTION_API}?category=${encodeURIComponent(filterID)}`;
        } else if (filterType === 'both' && filterID) {
            const { brandID, categoryID } = filterID;
            if (brandID || categoryID) {
                // Lọc theo cả brand và category
                url = `${COLLECTION_API}?brand=${encodeURIComponent(brandID)}&category=${encodeURIComponent(categoryID)}`;
            } else {
                throw new Error('Thiếu brandID hoặc categoryID khi lọc cả hai');
            }
        } else {
            throw new Error('Loại bộ lọc không hợp lệ hoặc thiếu thông tin bộ lọc');
        }

        // Log URL để kiểm tra
        console.log("URL API được gọi:", url);

        // Gửi yêu cầu GET đến API
        const response = await axios.get(url);

        // Trả về dữ liệu
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu sản phẩm (${filterType}):`, error.response?.data || error.message);
        throw error;
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
    getProductsByFilter,
    getProductsByQuery,
};
