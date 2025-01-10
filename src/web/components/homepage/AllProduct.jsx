import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Thêm các icon
import { getAllProduct } from "../../services/ProductService";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 10; // Số lượng sản phẩm mỗi trang

    // Lấy danh sách sản phẩm từ API
    const fetchData = () => {
        getAllProduct()
            .then(res => {
                const productsData = Array.isArray(res.data.data) ? res.data.data : []; // Đảm bảo rằng bạn đang lấy đúng dữ liệu
                setProducts(productsData);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching product data " + error);
                setError("Đã xảy ra lỗi khi tải sản phẩm.");
                setLoading(false);
            });
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Xử lý phân trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tính toán các sản phẩm cần hiển thị
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hiển thị loading trong khi chờ API
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500 animate-pulse">Đang tải sản phẩm...</div>
            </div>
        );
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
                <h2 className="text-lg font-semibold mb-2">Đã xảy ra lỗi</h2>
                <p>{error}</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={fetchData}
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">Danh sách sản phẩm</h2>

            {/* Hiển thị danh sách sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentProducts.map((product) => (
                    <div
                        key={product.productID}
                        className="product-card bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center transition-transform duration-300 ease-in-out"
                    >
                        <div className="relative h-48 xxs:h-60 xs:h-80 sm:h-80 md:h-96 lg:h-72 xl:h-80 2xl:h-80 transition-all duration-300 ease-in-out">
                            <Link to={`/products/${product.productID}`}>
                                <img
                                    src={product.imageURL}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-75 border-2 border-red-500"
                                    loading="lazy" // Lazy loading để cải thiện hiệu suất
                                />
                            </Link>
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                                -{(product.discount * 100).toFixed(0)}%
                            </div>
                        </div>
                        <div className="p-2 transition-opacity duration-300 ease-in-out">
                            <div className="text-sm font-semibold mb-2 text-center">
                                <Link to={`/products/${product.productID}`} className="text-gray-900 hover:text-gray-700 truncate block">{product.name}</Link>
                            </div>
                            <div className="flex items-center justify-center space-x-5">
                                <span className="text-sm font-bold text-red-500">{(parseFloat(product.price) - parseFloat(product.price) * parseFloat(product.discount)).toLocaleString()}₫</span>
                            </div>
                            <div className="flex items-center justify-center space-x-5">
                                <span className="text-gray-600 line-through ml-2 flex items-center justify-center space-x-5">
                                    {(parseFloat(product.price)).toLocaleString()}₫
                                </span>
                                <p className="text-gray-600 text-sm ">(Tiết kiệm {parseFloat(product.discount) * 100}%)</p>
                            </div>

                            <div className="mt-4 flex gap-12 items-center  m-2">
                                {/* Hiển thị thông tin Còn hàng với icon */}
                                {product.quantity > 0 ? (
                                    <div className="text-green-500 text-xs font-semibold flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-md">Còn hàng</span>
                                    </div>
                                ) : (
                                    <div className="text-red-500 text-xs font-semibold flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-md">Hết hàng</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Hiển thị thông báo nếu không có sản phẩm */}
            {currentProducts.length === 0 && (
                <div className="text-gray-500 text-center mt-4">
                    Không có sản phẩm nào để hiển thị
                </div>
            )}

            {/* Phân trang */}
            <div className="flex justify-center mt-4">
                {/* Nút "Prev" */}
                <button
                    className="bg-gray-200 px-4 py-2 rounded-l hover:bg-blue-500 hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <span className="px-4 py-2">{currentPage}</span>

                {/* Nút "Next" */}
                <button
                    className="bg-gray-200 px-4 py-2 rounded-r hover:bg-blue-500 hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={indexOfLastProduct >= products.length}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
