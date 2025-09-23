import { useEffect, useState } from "react";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../services/productService";
import type { ProductPayloadType as ProductType } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [formData, setFormData] = useState<ProductType>({
    _id: 0,
    name: "",
    price: 0,
    originalPrice: undefined,
    category: "",
    description: "",
    rating: undefined,
    reviews: undefined,
    inStock: false,
    image: undefined,
  });
  const [search, setSearch] = useState({ name: "", category: "" });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<ProductType | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProduct(editId.toString(), formData);
      } else {
        await createProduct(formData);
      }
      await fetchProducts();
      setIsAddOpen(false); // doubt
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // ✅ Input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));

    // ✅ Handle checkbox separately
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // narrow type
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    // Handle file
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setFormData((prev) => ({
          ...prev,
          [name]: target.files![0],
        }));
      }
      return;
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      _id: 0,
      name: "",
      price: 0,
      originalPrice: undefined,
      category: "",
      description: "",
      rating: undefined,
      reviews: undefined,
      inStock: false,
      image: undefined,
    });
    setEditId(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsAddOpen(true);
  };

  const handleView = (item: ProductType) => {
    setViewProduct(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: ProductType) => {
    setFormData({
      ...item,
      image: undefined, // clear image file for edit form
    });
    setEditId(item._id);
    setIsAddOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id.toString());
    await fetchProducts(); // refresh list after delete
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ✅ Select all toggle
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p._id));
    }
    setSelectAll(!selectAll);
  };

  // ✅ Multi delete
  const handleMultiDelete = async () => {
    for (const id of selectedIds) {
      await deleteProduct(id.toString());
    }
    await fetchProducts();
    setSelectedIds([]);
    setSelectAll(false);
  };

  return {
    fetchProducts,
    products,
    setProducts,
    search,
    setSearch,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    viewProduct,
    isAddOpen,
    editId,
    setIsAddOpen,
    isViewOpen,
    setIsViewOpen,
    handleAdd,
    handleView,
    handleEdit,
    handleDelete,
    handleCheckboxChange,
    handleSelectAll,
    handleMultiDelete,
    selectedIds,
    selectAll,
  };
};
