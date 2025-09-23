import ProductTable from "./ProductTable";
import { useProducts } from "../hooks/useProducts";
import ProductAddForm from "./ProductAddForm";
import ViewProduct from "./ViewProduct";
import Button from "../component/ui/button";
import { searchProducts } from "../services/productService";
import SearchInput from "../component/ui/search";

const Products: React.FC = () => {
  const {
    fetchProducts,
    products,
    setProducts,
    search,
    setSearch,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    isAddOpen,
    setIsAddOpen,
    isViewOpen,
    setIsViewOpen,
    viewProduct,
    editId,
    handleAdd,
    handleView,
    handleEdit,
    handleDelete,
    selectedIds,
    handleCheckboxChange,
    selectAll,
    handleSelectAll,
    handleMultiDelete,
  } = useProducts();

  return (
    <div className="ant-pro-table space-y-5 ">
      <div className="flex gap-3 items-center bg-white p-4 rounded shadow">
        <SearchInput
          type="text"
          placeholder="Search by Name"
          value={search.name}
          onChange={(e) =>
            setSearch((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <SearchInput
          type="text"
          placeholder="Search by Category"
          value={search.category}
          onChange={(e) =>
            setSearch((prev) => ({ ...prev, category: e.target.value }))
          }
        />

        <Button
          onClick={async () => {
            if (search.name || search.category) {
              const results = await searchProducts(search);

              setProducts(results);
            } else {
              fetchProducts();
            }
          }}
        >
          Search
        </Button>
      </div>

      <div className="p-5 bg-white rounded space-y-5">
        <ProductTable
          products={products}
          onAdd={handleAdd}
          onView={handleView}
          onDelete={handleDelete}
          onEdit={handleEdit}
          selectedIds={selectedIds}
          onCheckboxChange={handleCheckboxChange}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onMultiSelect={handleMultiDelete}
        />
      </div>

      {/* View Product Modal */}
      {isAddOpen && (
        <ProductAddForm
          formData={formData}
          setIsAddOpen={setIsAddOpen}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
          handleCategoryChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              category: value,
            }))
          }
        />
      )}

      {/* View Product Modal */}
      {isViewOpen && viewProduct && (
        <ViewProduct viewProduct={viewProduct} setIsViewOpen={setIsViewOpen} />
      )}
    </div>
  );
};

export default Products;
