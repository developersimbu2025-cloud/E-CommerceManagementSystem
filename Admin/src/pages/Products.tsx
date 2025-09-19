import ProductTable from "./ProductTable";

const Products: React.FC = () => {
  return (
    <div className="ant-pro-table space-y-5 ">
      <div className="ant-pro-card-search p-5 bg-white rounded">searchTerm</div>
      <div className="ant-pro-card-table p-5 bg-white rounded space-y-5">
        <ProductTable />
      </div>
    </div>
  );
};

export default Products;
