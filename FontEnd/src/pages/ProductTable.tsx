import { useEffect, useState } from "react";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import type { ProductType } from "../data/products";
import Button from "../component/ui/button";
import Modal from "../component/ui/Modal";

const ProductTable = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<Omit<ProductType, "_id">>({
    name: "",
    price: 0,
    description: "",
    category: "mobiles",
  });

  const fetchProduct = async () => {
    const data = await getProduct();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", price: 0, description: "", category: "mobiles" });
    setEditId(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleEdit = (item: ProductType) => {
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category ?? "mobiles",
    });
    setEditId(item._id);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      await updateProduct(editId, formData);
    } else {
      await createProduct(formData);
    }

    await fetchProduct();
    setIsOpen(false);
    resetForm();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    await fetchProduct();
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
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Price ($)</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={item._id} className="border-t">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3">${item.price}</td>
              <td className="px-4 py-3 flex space-x-2">
                <span
                  onClick={() => handleEdit(item)}
                  className="cursor-pointer text-blue-600 font-semibold"
                >
                  Edit
                </span>
                <span
                  onClick={() => handleDelete(item._id)}
                  className="cursor-pointer text-red-600 font-semibold"
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {product.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 bg-white">
            <div>Name: {item.name}</div>
            <div>Description: {item.description}</div>
            <div>Price: ${item.price}</div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editId ? "Update Product" : "Create Product"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border rounded-md px-3 py-2"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border rounded-md px-3 py-2"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="mobiles">Mobiles</option>
            <option value="appliances">Appliances</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md"
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
