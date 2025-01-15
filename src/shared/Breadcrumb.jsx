import React from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  // Transform the items array to the new Ant Design Breadcrumb items structure
  const breadcrumbItems = items.map((item) => ({
    title: item.href ? <Link to={item.href}>{item.title}</Link> : item.title,
  }));

  return (
    <div className="mt-14">
      <AntdBreadcrumb className="ml-4 mb-4" items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumb;
