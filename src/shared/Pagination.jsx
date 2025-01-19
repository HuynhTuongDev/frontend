import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    // Function to get the range of pages to show (maximum 5 pages)
    const getPageRange = () => {
        const pagesToShow = [];

        if (totalPages <= 3) {
            // If there are 3 or fewer pages, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pagesToShow.push(i);
            }
        } else {
            // If there are more than 3 pages
            if (currentPage === 1) {
                pagesToShow.push(1, 2, 3); // Show the first 3 pages
            } else if (currentPage === totalPages) {
                pagesToShow.push(totalPages - 2, totalPages - 1, totalPages); // Show the last 3 pages
            } else {
                // Show 2 pages before and after the current page
                pagesToShow.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pagesToShow;
    };

    const pageRange = getPageRange();

    return (
        <div className="flex justify-center items-center space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-l"
            >
                Previous
            </button>

            {/* Render page buttons */}
            {pageRange.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-300 rounded`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-r"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
