export type ProductType = {
  _id: string;
  name: string;
  price: number;
  category: "mobiles" | "appliances";

  description: string;
};

export const categories = [
  { id: "mobiles", name: "Mobiles", count: 7 },
  { id: "appliances", name: "Home Appliances", count: 7 },
];
