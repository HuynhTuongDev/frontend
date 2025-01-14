import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { getSlider } from "../../services/SliderService";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Link } from "react-router-dom";

const Slider = () => {
    const [sliders, setSliders] = useState([]);
    console.log("Sliders data:", sliders);
    const carouselRef = React.useRef(null); // Create a reference for the carousel

    // Function to fetch slider data from API
    const fetchData = () => {
        getSlider()
            .then(response => {
                // Kiểm tra xem response.data có phải là một mảng
                const data = Array.isArray(response.data?.data) ? response.data.data : [];
                setSliders(data);
            })
            .catch(error => {
                console.error("Error fetching sliders data:", error);
                setSliders([]);  // Gán mảng rỗng nếu có lỗi
            });
    };



    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Custom function to go to the next slide
    const next = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    // Custom function to go to the previous slide
    const prev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    return (
        <div className="relative">
            <Carousel
                autoplay
                dots={{ className: 'custom-dots' }}
                className="-z-60"
                ref={carouselRef}
                slidesToShow={2} // Hiển thị 2 slides mỗi lần
                swipeToSlide={true}
                centerMode={true}
                arrows={false}
                responsive={[
                    {
                        breakpoint: 1024, // Khi màn hình < 1024px
                        settings: {
                            slidesToShow: 2, // Hiển thị 2 slide
                        },
                    },
                    {
                        breakpoint: 768, // Khi màn hình < 768px (1/2)
                        settings: {
                            slidesToShow: 1, // Hiển thị 1 slide
                        },
                    },
                ]}
            >
                {sliders.map((slider) => (
                    <div key={slider.sliderID} className="w-full">  {/* Thêm padding nếu cần và điều chỉnh chiều rộng */}
                        <Link to={slider.imageURL}>
                            <img
                                src={slider.imageURL}
                                className="w-full h-auto object-contain px-6 border-4 border-red-300 rounded-xl"  // Giữ tỷ lệ ảnh
                                alt={`Slide ${slider.description}`}
                            />
                        </Link>
                    </div>
                ))}
            </Carousel>

            {/* Navigation buttons */}
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                onClick={prev}
                aria-label="Previous"
            >
                <LeftOutlined className="hover:text-blue-500" />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                onClick={next}
                aria-label="Next"
            >
                <RightOutlined className="hover:text-blue-500" />
            </button>
        </div>

    );
};

export default Slider;

// CSS styles
const styles = `
.custom-dots li {
  background: black !important; // Set dot color to black
}
.custom-dots li.slick-active {
  background: gray !important; // Optional: active dot color
}

@media (max-width: 1024px) {
    .slick-slide {
        width: 100% !important; // Chắc chắn chỉ hiển thị một slide trên màn hình nhỏ
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
