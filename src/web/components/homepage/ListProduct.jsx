import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { getProductByQuery } from "../../services/ProductService";
import { Link } from "react-router-dom";
import { Button } from 'antd';

const ListProduct = (props) => {
    const [products, setProducts] = useState([]);
    const [hoveredProductTitle, setHoveredProductTitle] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const fetchData = () => {
        getProductByQuery(props.query)
            .then(res => {
                const productsData = Array.isArray(res.data.data) ? res.data.data : []; // Đảm bảo rằng bạn đang lấy đúng dữ liệu
                setProducts(productsData);
            })
            .catch((error) => console.log("Error fetching product data " + error));
    };


    useEffect(() => {
        fetchData();
    }, [props.query]);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (name) => {
        setHoveredProductTitle(name);
    };

    const handleMouseLeave = () => {
        setHoveredProductTitle("");
    };

    return (
        <div className="py-12">
            <div className="mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {
                        products.length > 0 ? (
                            products.map(product => (
                                <div
                                    key={product.productID}
                                    className="product-card bg-white shadow-lg rounded-lg overflow-hidden relative group animate-move-from-center transition-transform duration-300 ease-in-out"
                                    onMouseEnter={() => handleMouseEnter(product.name)}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
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
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200 ease-in-out"
                                                onClick={() => addToCart(product.productID)} // Giả sử bạn có một hàm addToCart
                                            >
                                                <FontAwesomeIcon icon={faCartShopping} />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p>No products found</p>
                            </div>
                        )
                    }
                    <div className="col-span-full text-right mt-4">
                        <Button className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out">
                            <Link to={`/products/allproducts`} className="flex items-center space-x-2 group">
                                <span>Xem thêm</span>
                                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        </Button>
                    </div>


                </div>

                {hoveredProductTitle && (
                    <div
                        className="fixed bg-gray-800 text-xs text-white p-2 rounded-md transition-opacity duration-300 ease-in-out"
                        style={{
                            left: mousePosition.x + 10,
                            top: mousePosition.y + 10
                        }}
                    >
                        {hoveredProductTitle}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListProduct;
