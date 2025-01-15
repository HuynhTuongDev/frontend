import React from "react";
import ListProduct from "./web/components/homepage/ListProduct";
import OurPolicy from "./web/components/homepage/OurPolicy";
import Slider from "./web/components/homepage/Slider";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const HomePage = () => {
    return (
        <>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <Navbar />
            </div>
            <main className="p-4">
                <Slider />
                <OurPolicy />
                <hr />
                <div>
                    {/* Hot Deals */}
                    <section
                        style={{
                            backgroundImage: "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/desk_header_bg_f40c131d23.png')", // Link banner
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                        className="text-white"
                    >
                        <h2 className="text-3xl font-bold text-center mb-12">Hot Deals</h2>
                        <div className="grid gap-4">
                            <ListProduct query="sorted-and-paged?sortBy=discount&page=0&size=8&sortOrder=asc" />
                        </div>
                    </section>

                    {/* New Product */}
                    <section
                        style={{
                            backgroundImage: "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/desk_header_bg_5c0b940e70.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                        className="text-white"
                    >
                        <h2 className="text-3xl font-bold text-center mb-12">New Product</h2>
                        <div className="grid gap-4">
                            <ListProduct query="sorted-and-paged?sortBy=productID&page=0&size=8&sortOrder=desc" />
                        </div>
                    </section>

                    {/* Best Seller */}
                    <section
                        style={{
                            backgroundImage: "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/Backgroung_gia_online_D_2_a2745b43fc.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                        className="text-white"
                    >
                        <h2 className="text-3xl font-bold text-center mb-12">Best Seller</h2>
                        <div className="grid gap-4">
                            <ListProduct query="sorted-and-paged?sortBy=sold&page=0&size=8&sortOrder=asc" />
                        </div>
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default HomePage;
