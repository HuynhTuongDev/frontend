import React from "react";

const CopyRight = () => {
  return (
    <div className="bg-black">
      <hr />
      <p className="py-5 text-sm text-center text-white">
        Copyright {new Date().getFullYear()} @ Space Phone - All Right Reserved
      </p>
    </div>
  );
};

export default CopyRight;
