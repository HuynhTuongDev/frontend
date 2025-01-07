import React from "react";

const Title = ({ text1, text2 }) => {
    return (
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{text1}</h2>
            <p className="text-xl text-gray-600">{text2}</p>
        </div>
    );
};

export default Title;
