export type ProductType = {
  _id: string;
  name: string;
  price: number;
  category?: "mobiles" | "appliances"; // optional if backend doesn’t always send
  description: string;
};

export const categories = [
  { id: "mobiles", name: "Mobiles" },
  { id: "appliances", name: "Home Appliances" },
];
