import React, { useState } from "react";
import { Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ListProduct from "./web/components/homepage/ListProduct";
import OurPolicy from "./web/components/homepage/OurPolicy";
import Slider from "./web/components/homepage/Slider";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
    const [activeSection, setActiveSection] = useState("hotDeals");
    const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

    return (
        <Layout>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Navbar />
            </div>
            <Content className="p-4">
                <Slider />
                <div className="mt-10">
                    {/* Nút chuyển đổi danh mục */}
                    <div className="flex justify-center gap-4 mb-6">
                        <Button
                            className={`transition-all duration-300 px-6 py-3 rounded-full shadow-md ${activeSection === "hotDeals" ? "bg-blue-500 text-white" : "bg-white text-black border border-gray-300"
                                }`}
                            onClick={() => setActiveSection("hotDeals")}
                        >
                            Hot Deals
                        </Button>
                        <Button
                            className={`transition-all duration-300 px-6 py-3 rounded-full shadow-md ${activeSection === "newProduct" ? "bg-blue-500 text-white" : "bg-white text-black border border-gray-300"
                                }`}
                            onClick={() => setActiveSection("newProduct")}
                        >
                            New Product
                        </Button>
                        <Button
                            className={`transition-all duration-300 px-6 py-3 rounded-full shadow-md ${activeSection === "bestSeller" ? "bg-blue-500 text-white" : "bg-white text-black border border-gray-300"
                                }`}
                            onClick={() => setActiveSection("bestSeller")}
                        >
                            Best Seller
                        </Button>
                    </div>

                    {/* Hot Deals */}
                    {activeSection === "hotDeals" && (
                        <section className="bg-white p-5 rounded-3xl shadow-lg">
                            <Title level={2} className="text-center mb-12">
                                Hot Deals
                            </Title>
                            <div className="grid gap-4">
                                <ListProduct query="sorted-and-paged?sortBy=discount&page=0&size=8&sortOrder=asc" />
                            </div>
                            <div className="text-center mt-6">
                                <Button
                                    type="primary"
                                    className="rounded-full px-8 py-3"
                                    onClick={() =>
                                        navigate("/products/sorted-and-paged?sortBy=discount&page=0&sortOrder=asc")
                                    }
                                >
                                    Xem thêm
                                </Button>
                            </div>
                        </section>
                    )}

                    {/* New Product */}
                    {activeSection === "newProduct" && (
                        <section className="bg-white p-5 rounded-3xl shadow-lg">
                            <Title level={2} className="text-center mb-12">
                                New Product
                            </Title>
                            <div className="grid gap-4">
                                <ListProduct query="sorted-and-paged?sortBy=productID&page=0&size=8&sortOrder=desc" />
                            </div>
                            <div className="text-center mt-6">
                                <Button
                                    type="primary"
                                    className="rounded-full px-8 py-3"
                                    onClick={() =>
                                        navigate("/products/sorted-and-paged?sortBy=productID&page=0&sortOrder=desc")
                                    }
                                >
                                    Xem thêm
                                </Button>
                            </div>
                        </section>
                    )}

                    {/* Best Seller */}
                    {activeSection === "bestSeller" && (
                        <section className="bg-white p-5 rounded-3xl shadow-lg">
                            <Title level={2} className="text-center mb-12">
                                Best Seller
                            </Title>
                            <div className="grid gap-4">
                                <ListProduct query="sorted-and-paged?sortBy=sold&page=0&size=8&sortOrder=asc" />
                            </div>
                            <div className="text-center mt-6">
                                <Button
                                    type="primary"
                                    className="rounded-full px-8 py-3"
                                    onClick={() =>
                                        navigate("/products/sorted-and-paged?sortBy=sold&page=0&sortOrder=asc")
                                    }
                                >
                                    Xem thêm
                                </Button>
                            </div>
                        </section>
                    )}
                </div>
            </Content>
            <OurPolicy />
            <Footer />
        </Layout>
    );
};

export default HomePage;
