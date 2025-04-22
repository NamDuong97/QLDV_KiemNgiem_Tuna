import React from "react";

interface Props {}

const Footer = (props: Props) => {
  return (
    <div className="bg-blue-400 py-9 flex justify-center">
      <p className="font-medium text-xl/4 text-center">
        Copyright 2025 © Bản quyền nội dung thuộc toàn quyền sở hữu của{" "}
        <span className="font-bold">Viện Kiểm Nghiệm Thuốc Tuna</span>
      </p>
    </div>
  );
};

export default Footer;
