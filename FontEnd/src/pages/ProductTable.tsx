import { useEffect, useState } from "react";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductType,
} from "../services/productService";
import Button from "../component/ui/button";
import Modal from "../component/ui/Modal";

const ProductTable = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<ProductType>({
    _id: 0,
    productName: "",
    productPrice: 0,
    productDescription: "",
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
      productName: "",
      productPrice: 0,
      productDescription: "",
    });
    setEditId(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleEdit = (item: ProductType) => {
    setFormData(item); // pre-fill form with selected product
    setEditId(item._id);
    setIsOpen(true);
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? Number(value) : value, // ensure price is number
    }));
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id.toString());
    await fetchProduct(); // refresh list after delete
  };

  return (
    <div className="overflow-x-auto space-y-5">
      <div className="flex justify-end">
        <Button onClick={handleAdd}>Create Product</Button>
      </div>
      {/* Desktop View */}
      <table className="hidden md:table w-full rounded-lg">
        <thead className="bg-gray-100">
          <tr>
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
              Price ($)
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={item._id} className="border-t border-gray-200">
              <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.productName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.productDescription}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                ${item.productPrice}
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
                    onClick={() => handleDelete(item._id)}
                    className="font-bold cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
              </td>
            </tr>
          ))}
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
              <span className="text-gray-600">{item.productName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Description:</span>
              <span className="text-gray-600">{item.productDescription}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Price:</span>
              <span className="text-gray-600">${item.productPrice}</span>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.productName}
              name="productName"
              onChange={handleChange}
              placeholder="Please enter product name"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.productDescription}
              name="productDescription"
              onChange={handleChange}
              placeholder="Please enter product description"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.productPrice}
              name="productPrice"
              onChange={handleChange}
              placeholder="Please enter price"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
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
    </div>
  );
};

export default ProductTable;
