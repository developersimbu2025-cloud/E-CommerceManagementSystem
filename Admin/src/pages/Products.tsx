import { useState } from "react";
import SearchInput from "../component/ui/search";
import ProductTable from "./ProductTable";

const Products: React.FC = () => {
   const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="ant-pro-table space-y-5 ">
      <div className="ant-pro-card-search p-5 bg-white rounded">
        <SearchInput value={searchTerm} placeholder="Enter Product Name" />
      </div>
      <div className="ant-pro-card-table p-5 bg-white rounded space-y-5">
        <ProductTable />
      </div>
    </div>
  );
};

export default Products;
