export type ProductType = {
  _id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

export const categories = [
  { id: "mobiles", name: "Mobiles" },
  { id: "appliances", name: "Home Appliances" },
];

const API_URL = "http://localhost:4000/api/products";

export const getProduct = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const createProduct = async (product: {
  name: string;
  price: number;
  description: string;
}) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};

export const updateProduct = async (_id: string, product: ProductType) => {
  const res = await fetch(`${API_URL}/${product._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
};

export const getAllProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};
