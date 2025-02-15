import React, { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const SearchBar = ({ setResult }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput(e.target.value);
    fetchData(e.target.value);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData(input);
    }, 300);

    return () => {
      clearTimeout(delay);
    };
  }, [input]);

  const fetchData = (value) => {
    if (value === "") {
      setResult({});
      return;
    }
    getProductBySearchValue(value).then((res) => {
      setResult(res.data);
    });
  };
  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <form
        className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2"
        onSubmit={handleSubmit} // Thêm onSubmit
      >
        <input
          type="text"
          onChange={handleChange}
          value={input}
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button
          type="submit" // Đổi type thành submit để kích hoạt sự kiện submit của form
        >
          <SearchOutlined
            style={{ fontSize: "20px", marginTop: "4px" }}
            alt="Search Icon"
          />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
