import Camera from "../assets/Electronices/camera-portable.webp";
import Projector from "../assets/Electronices/led-projector.webp";
import ProjectorHigh from "../assets/Electronices/led-projector-high.webp";
import Headphone from "../assets/Electronices/headphone.webp";
import Monitor from "../assets/Electronices/monitor.webp";
import Projectors from "../assets/Electronices/projector.webp";
import Smartwatch from "../assets/Electronices/smartwatch.webp";
import ApplePhone from "../assets/Mobiles/Apple.webp";
import ApplePhone2 from "../assets/Mobiles/Apple2.webp";
import ApplePhone3 from "../assets/Mobiles/Apply-Iphone.webp";
import OppoV2 from "../assets/Mobiles/OppoV2.webp";
import OppoV3 from "../assets/Mobiles/OppoV3.webp";
import OppoV4 from "../assets/Mobiles/Vivo-Arctic.webp";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  largeImage?: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  // Mobiles
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    description:
      "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system.",
    image: ApplePhone,
    largeImage: ProjectorHigh,
    category: "mobiles",
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    description:
      "Premium Android smartphone with S Pen, AI features, and 200MP camera.",
    image: ApplePhone2,
    largeImage: ProjectorHigh,
    category: "mobiles",
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    price: 899,
    originalPrice: 999,
    description:
      "Pure Android experience with advanced AI photography and Magic Eraser.",
    image: ApplePhone3,
    largeImage: ProjectorHigh,
    category: "mobiles",
    rating: 4.6,
    reviews: 1234,
    inStock: true,
  },
  {
    id: "4",
    name: "OnePlus 12",
    price: 799,
    description:
      "Fast performance with OxygenOS, 100W charging, and Hasselblad cameras.",
    image: OppoV2,
    largeImage: ProjectorHigh,
    category: "mobiles",
    rating: 4.5,
    reviews: 892,
    inStock: true,
  },
  {
    id: "5",
    name: "Xiaomi 14 Ultra",
    price: 749,
    description: "Flagship smartphone with Leica cameras and MIUI 15.",
    image: OppoV3,
    largeImage: ProjectorHigh,
    category: "mobiles",
    rating: 4.4,
    reviews: 567,
    inStock: false,
  },
  {
    id: "5",
    name: "Xiaomi 14 Ultra",
    price: 749,
    description: "Flagship smartphone with Leica cameras and MIUI 15.",
    image: OppoV4,
    largeImage: ProjectorHigh,
    category: "mobiles",
    rating: 4.4,
    reviews: 567,
    inStock: false,
  },

  // Home Appliances
  {
    id: "7",
    name: 'LG OLED C3 65" TV',
    price: 1999,
    originalPrice: 2299,
    description:
      "Premium OLED TV with perfect blacks, vibrant colors, and webOS smart platform.",
    image: Projector,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.9,
    reviews: 3421,
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Samsung French Door Refrigerator",
    price: 1499,
    description:
      "25 cu ft refrigerator with FlexZone drawer and Family Hub technology.",
    image: Headphone,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.6,
    reviews: 2145,
    inStock: true,
    featured: true,
  },
  {
    id: "9",
    name: "Dyson V15 Detect Vacuum",
    price: 649,
    originalPrice: 749,
    description:
      "Cordless vacuum with laser dust detection and intelligent suction.",
    image: Camera,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.7,
    reviews: 1823,
    inStock: true,
  },
  {
    id: "10",
    name: "KitchenAid Stand Mixer",
    price: 379,
    description:
      "Professional 5-quart mixer with 10 speeds and multiple attachments.",
    image: Monitor,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.8,
    reviews: 4567,
    inStock: true,
  },
  {
    id: "11",
    name: "Instant Pot Duo 8-Quart",
    price: 99,
    originalPrice: 129,
    description:
      "7-in-1 electric pressure cooker, slow cooker, rice cooker, and more.",
    image: Projectors,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.5,
    reviews: 8934,
    inStock: true,
  },
  {
    id: "12",
    name: "Ninja Foodi Air Fryer",
    price: 199,
    description:
      "Large capacity air fryer with multiple cooking functions and easy cleanup.",
    image: Smartwatch,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.4,
    reviews: 2341,
    inStock: true,
  },
  {
    id: "13",
    name: "Breville Espresso Machine",
    price: 599,
    description:
      "Professional espresso machine with built-in grinder and milk frother.",
    image: Projector,
    largeImage: ProjectorHigh,
    category: "appliances",
    rating: 4.6,
    reviews: 1456,
    inStock: false,
  },
];

export const categories = [
  { id: "mobiles", name: "Mobiles", count: 7 },
  { id: "appliances", name: "Home Appliances", count: 7 },
];
