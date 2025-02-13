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
            <div className="mx-auto w-4/5">
                <div className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        products.length > 0 ? (
                            products.map(product => (
                                <div
                                    key={product.productID}
                                    className="product-card bg-white shadow-lg rounded-3xl overflow-hidden relative group animate-move-from-center transition-transform duration-300 ease-in-out"
                                    onMouseEnter={() => handleMouseEnter(product.name)}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                >
                                    <div className="relative h-3đ xxs:h-60 xs:h-80 sm:h-80 md:h-96 lg:h-72 xl:h-80 2xl:h-80 transition-all duration-300 ease-in-out">
                                        <Link to={`/products/${product.productID}`}>
                                            <img
                                                src={product.imageURL}
                                                alt={product.name}
                                                className="w-full h-3/4 object-contain transition-transform duration-300 ease-in-out hover:scale-75 mt-5"
                                                loading="lazy" // Lazy loading để cải thiện hiệu suất
                                            />
                                        </Link>
                                        <div className="absolute top-0 right-0 bg-red-600 text-white text-sm px-2 py-1 rounded-bl-lg">
                                            -{(product.discount * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="p-2 transition-opacity duration-300 ease-in-out">
                                        <div className="text-lg font-semibold mb-2 text-center">
                                            <Link to={`/products/${product.productID}`} className="text-gray-900 hover:text-gray-700 truncate block">{product.name}</Link>
                                        </div>
                                        <div className="flex items-center justify-center space-x-5">
                                            <span className="text-xl font-bold text-blue-500">{(parseFloat(product.price) - parseFloat(product.price) * parseFloat(product.discount)).toLocaleString()}₫</span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-5">
                                            <span className=" text-base text-gray-600 line-through ml-2 flex items-center justify-center space-x-5">
                                                {(parseFloat(product.price)).toLocaleString()}₫
                                            </span>
                                            <p className="text-red-600 text-sm ">(Tiết kiệm {parseFloat(product.discount) * 100}%)</p>
                                        </div>

                                        <div className="mt-4 flex justify-between gap-12 items-center  m-2">
                                            {/* Hiển thị thông tin Còn hàng với icon */}
                                            {product.quantity > 0 ? (
                                                <div className="text-green-500 text-xs font-semibold flex items-center space-x-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-base">Còn hàng</span>
                                                </div>
                                            ) : (
                                                <div className="text-red-500 text-xs font-semibold flex items-center space-x-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className="text-base">Hết hàng</span>
                                                </div>
                                            )}
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-3xl flex items-center space-x-2 hover:bg-blue-600 transition duration-200 ease-in-out"
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
        </div >
    );
};

export default ListProduct;
