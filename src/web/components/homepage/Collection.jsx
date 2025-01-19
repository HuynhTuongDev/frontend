import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import {
    getAllProducts,
    getByCategoryID,
    getByBrandID,
} from "../../services/ProductService";
import { getBrands } from "../../services/BrandService";
import { getCategories } from "../../services/CategoryService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import OurPolicy from "./OurPolicy";
import Slider from "./Slider";
import Footer from "../../../shared/Footer";
import Navbar from "../../../shared/Navbar";
import Pagination from '../../../shared/Pagination'; // Import Pagination Component
const { Title } = Typography;
const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
};

const Collection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); // Number of products per page

    const queryParams = new URLSearchParams(location.search);
    const categoryID = queryParams.get('categoryID');
    const brandID = queryParams.get('brandID');

    // Fetch categories and brands for filtering
    const fetchFilters = async () => {
        try {
            const categoryData = await getCategories();
            const brandData = await getBrands();
            setCategories(Array.isArray(categoryData.data) ? categoryData.data : []);
            setBrands(Array.isArray(brandData.data) ? brandData.data : []);
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    };

    // Fetch products based on category or brand
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            let productsData = [];
            if (categoryID) {
                productsData = await getByCategoryID(categoryID);
            } else if (brandID) {
                productsData = await getByBrandID(brandID);
            } else {
                productsData = await getAllProducts();
            }
            setProducts(productsData);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            setError("Không thể tải sản phẩm. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilters(); // Fetch categories and brands for filter options
        fetchData(); // Fetch products when component mounts or filters change
    }, [categoryID, brandID]);

    const handleFilterChange = (filterType, filterID) => {
        const queryParams = new URLSearchParams(location.search);
        if (filterType === "categoryID") {
            queryParams.set("categoryID", filterID);
        } else if (filterType === "brandID") {
            queryParams.set("brandID", filterID);
        }
        navigate(`?${queryParams.toString()}`); // Update the URL to reflect the filter changes
    };

    const addToCart = (productID) => {
        console.log("Add product to cart:", productID);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => {
        setHoveredProductTitle("");
    };

    // Paginated products
    const paginatedProducts = paginate(products, currentPage, productsPerPage);

    return (
        <>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
                <Navbar />
            </div>
            <Slider />
            <div className="py-12">
                <div className="mx-auto w-full flex gap-6">
                    {/* Left sidebar with filters */}
                    <div className="w-1/4 bg--200 shadow-lg p-6 rounded-lg ml-10">
                        <Title level={2} className="mb-6 flex items-center">
                            <FilterOutlined className="mr-2" />
                            Lọc sản phẩm
                        </Title>

                        {/* Category Filter */}
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-black-700 mb-4 border-b pb-2 border-gray-300">Danh mục</h3>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li key={category.categoryID}>
                                        <button
                                            className={`flex items-center justify-between px-4 py-2 w-full text-left rounded-lg transition-all duration-200 ${categoryID === category.categoryID
                                                ? 'bg-red-500 text-white font-bold shadow'
                                                : 'bg-gray-200 text-black-700 hover:bg-red-600 hover:text-white'
                                                }`}
                                            onClick={() => handleFilterChange("categoryID", category.categoryID)}
                                        >
                                            <span>{category.categoryName}</span>
                                            {categoryID === category.categoryID && (
                                                <span className="material-icons-outlined text-lg"></span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brand Filter */}
                        <div>
                            <h3 className="text-lg font-medium text-black-700 mb-4 border-b pb-2 border-gray-300">Thương hiệu</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {brands.map((brand) => (
                                    <li key={brand.brandID}>
                                        <button
                                            className={`flex items-center justify-between px-4 py-2 w-full text-left rounded-lg transition-all duration-200 ${brandID === brand.brandID
                                                ? 'bg-red-500 text-white font-bold shadow'
                                                : 'bg-gray-200 text-black-700 hover:bg-red-600 hover:text-white'
                                                }`}
                                            onClick={() => handleFilterChange("brandID", brand.brandID)}
                                        >
                                            <span>{brand.brandName}</span>
                                            {brandID === brand.brandID && (
                                                <span className="material-icons-outlined text-lg"></span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    {/* Right side with products */}
                    <div className="w-full">
                        <div className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {
                                paginatedProducts.length > 0 ? (
                                    paginatedProducts.map(product => (
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
                        {/* Pagination Component */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(products.length / productsPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            <OurPolicy />
            <Footer />
        </>
    );
};

export default Collection;
