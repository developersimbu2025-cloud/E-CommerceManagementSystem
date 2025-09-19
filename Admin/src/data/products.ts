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
