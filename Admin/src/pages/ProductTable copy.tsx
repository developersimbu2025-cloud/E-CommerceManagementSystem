import { useEffect, useState } from "react";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import type { ProductType } from "../data/products";
import type { ProductPayloadType } from "../services/productService";

import { categories } from "../data/products";
import Button from "../component/ui/button";
import Modal from "../component/ui/Modal";
import Dropdown from "../component/ui/dropdown";
import Input from "../component/ui/input";
import Textarea from "../component/ui/textarea";

const ProductTable = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<ProductType | null>(null);
  const [formData, setFormData] = useState<ProductPayloadType>({
    _id: 0,
    name: "",
    price: 0,
    originalPrice: 0,
    category: "",
    description: "",
    rating: 0,
    reviews: 0,
    inStock: false, // default boolean value
    image: undefined, // optional File
  });

  const fetchProduct = async () => {
    const data = await getProduct();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const resetForm = () => {
    setFormData({
      _id: 0,
      name: "",
      price: 0,
      originalPrice: 0,
      category: "",
      description: "",
      rating: 0,
      reviews: 0,
      inStock: false,
      image: undefined,
    });
    setEditId(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleEdit = (item: ProductType) => {
    setFormData({
      ...item,
      image: undefined, // clear image because backend uses string
    }); // pre-fill form with selected product
    setEditId(item._id);
    setIsOpen(true);
  };

  const handleView = (item: ProductType) => {
    setViewProduct(item);
    setIsViewOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      // update existing product
      await updateProduct(editId.toString(), formData);
    } else {
      // create new product
      await createProduct(formData);
    }

    await fetchProduct();
    setIsOpen(false);
    resetForm();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id.toString());
    await fetchProduct(); // refresh list after delete
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(product.map((p) => p._id));
    }
    setSelectAll(!selectAll);
  };

  const handleMultiDelete = async () => {
    for (const id of selectedIds) {
      await deleteProduct(id.toString());
    }
    await fetchProduct();
    setSelectedIds([]);
    setSelectAll(false);
  };

  return (
    <div className="overflow-x-auto space-y-5">
      <div className="flex justify-end gap-2">
        <Button onClick={handleAdd}>Create Product</Button>

        {selectedIds.length > 0 && (
          <Button className="bg-red-600 text-white" onClick={handleMultiDelete}>
            Delete Selected
          </Button>
        )}
      </div>
      {/* Desktop View */}
      <table className="hidden md:table w-full rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Product Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              OriginalPrice
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Rating
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Reviews
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              InStock
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {product.length === 0 ? (
            <tr className="mt-2">
              <td
                colSpan={11}
                className="text-center py-4 text-gray-500 p-5 border  border-gray-200"
              >
                No product available
              </td>
            </tr>
          ) : (
            product.map((item, index) => (
              <tr key={item._id} className="border-t border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.description && "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  ₹{item.price}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.image ? (
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `http://localhost:4000${item.image}`
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.originalPrice}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.rating}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.reviews}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.inStock ? "Yes" : "No"}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  <div className="flex space-x-2">
                    <div
                      onClick={() => handleEdit(item)}
                      className="font-bold cursor-pointer"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => handleView(item)}
                      className="font-bold cursor-pointer"
                    >
                      View
                    </div>
                    <div
                      onClick={() => handleDelete(item._id)}
                      className="font-bold cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile View (Card layout) */}
      <div className="md:hidden space-y-4">
        {product.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">ID:</span>
              <span className="text-gray-600">{item._id}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Description:</span>
              <span className="text-gray-600">{item.description && "-"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Price:</span>
              <span className="text-gray-600">${item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editId ? "Update Product" : "Create Product"}
      >
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
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={formData.description}
                name="description"
                onChange={handleChange}
                placeholder="Enter Product Description"
                rows={5}
                className="mt-1"
              ></Textarea>
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
              <label className="block text-sm font-medium text-gray-700">
                In Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="checkbox"
                checked={formData.inStock}
                name="inStock"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inStock: e.target.checked,
                  }))
                }
                className="mt-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
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
                onSelect={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: option.value,
                  }))
                }
              />
            </div>

            <div className="col-span-2">
              {/* <input
                type="file"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: e.target.files?.[0],
                  }))
                }
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm border-gray-300"
              /> */}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
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
      </Modal>

      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Product Details"
      >
        {viewProduct && (
          <div className="space-y-3 text-sm">
            <div>
              <strong>ID:</strong> {viewProduct._id}{" "}
            </div>
            <div>
              <strong>Name:</strong> {viewProduct.name}
            </div>
            <div>
              <strong>Description:</strong> {viewProduct.description}
            </div>
            <div>
              <strong>Price:</strong> ₹{viewProduct.price}
            </div>
            <div>
              <strong>Original Price:</strong> ₹{viewProduct.originalPrice}
            </div>
            <div>
              <strong>Category:</strong> {viewProduct.category}
            </div>
            <div>
              <strong>Rating:</strong> {viewProduct.rating}
            </div>
            <div>
              <strong>Reviews:</strong> {viewProduct.reviews}
            </div>
            <div>
              <strong>In Stock:</strong> {viewProduct.inStock ? "Yes" : "No"}
            </div>
            <div>
              <strong>Image:</strong>
              <br />
              {viewProduct.image ? (
                <img
                  src={
                    viewProduct.image.startsWith("http")
                      ? viewProduct.image
                      : `http://localhost:4000${viewProduct.image}`
                  }
                  alt={viewProduct.name}
                  className="w-32 h-32 object-cover rounded-md mt-2"
                />
              ) : (
                <span>No Image</span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;
