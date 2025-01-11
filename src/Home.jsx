import React, { useState } from "react";
import ListProduct from "./web/components/homepage/ListProduct";
import OurPolicy from "./web/components/homepage/OurPolicy"
const HomePage = () => {
    const [activeTab, setActiveTab] = useState("SmartPhones");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <main className="p-4">
                {/* <Carousel /> */}
                <OurPolicy />
                <hr />
                <ul className="hnt-tab flex justify-center space-x-4 text-center py-4">
                    <li
                        className={`item cursor-pointer transition-transform duration-300 ease-in-out ${activeTab === "SmartPhones"
                            ? "text-blue-600 font-bold border-b-2 border-blue-600"
                            : "text-gray-600"
                            } hover:scale-105`}
                    >
                        <a onClick={() => handleTabClick("SmartPhones")}>Smart Phones</a>
                    </li>
                    <li
                        className={`item cursor-pointer transition-transform duration-300 ease-in-out ${activeTab === "Laptops"
                            ? "text-blue-600 font-bold border-b-2 border-blue-600"
                            : "text-gray-600"
                            } hover:scale-105`}
                    >
                        <a onClick={() => handleTabClick("Laptops")}>Laptops</a>
                    </li>
                    <li
                        className={`item cursor-pointer transition-transform duration-300 ease-in-out ${activeTab === "Accessory"
                            ? "text-blue-600 font-bold border-b-2 border-blue-600"
                            : "text-gray-600"
                            } hover:scale-105`}
                    >
                        <a onClick={() => handleTabClick("Accessory")}>Accessory</a>
                    </li>
                </ul>

                {activeTab === "Laptops" && (
                    <ListProduct query="sorted-and-paged?categoryID=2&page=1&size=10&sortOrder=desc" />
                )}
                {activeTab === "SmartPhones" && (
                    <ListProduct query="sorted-and-paged?categoryID=1&page=1&size=10&sortOrder=asc" />
                )}
                {activeTab === "Accessory" && (
                    <ListProduct query="sorted-and-paged?categoryID=3&page=1&size=10&sortOrder=desc" />
                )}

            </main>
        </>
    );
};

export default HomePage;
