import React from "react";
import Textarea from "../component/ui/textarea";
import Input from "../component/ui/input";
import type { ProductPayloadType } from "../services/productService";
import { categories } from "../data/products";
import Dropdown from "../component/ui/dropdown";

type ProductAddFormProps = {
  formData: ProductPayloadType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCategoryChange: (value: string) => void;
  setIsAddOpen: any;
  editId: number | null;
};

const ProductAddForm: React.FC<ProductAddFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  handleCategoryChange,
  setIsAddOpen,
  editId,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsAddOpen(false)} // ✅ close modal
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {editId ? "Update Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter Product Name"
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.price}
                name="price"
                onChange={handleChange}
                placeholder="Enter Product Price"
                className="mt-1 "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Original Price <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.originalPrice}
                name="originalPrice"
                onChange={handleChange}
                placeholder="Enter Original Price"
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.rating}
                name="rating"
                onChange={handleChange}
                placeholder=" Enter Product Rating"
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reviews <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.reviews}
                name="reviews"
                onChange={handleChange}
                placeholder="Enter Product Reviews"
                className="mt-1"
              />
            </div>

            <div>
              <Dropdown
                label="Category"
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                value={formData.category}
                onSelect={(option) => handleCategoryChange(option.value)} // 👈 use prop
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image Upload <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="image" // 👈 important so handleChange knows which field to update
                onChange={handleChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                In Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="checkbox"
                checked={formData.inStock}
                name="inStock"
                onChange={handleChange}
                className="mt-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={formData.description}
                name="description"
                onChange={handleChange}
                placeholder="Enter Product Description"
                rows={5}
                className="mt-1"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsAddOpen(false)}
              type="button"
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 bg-[#3e3e3e] text-white rounded-md hover:bg-blue-700"
            >
              {editId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddForm;
