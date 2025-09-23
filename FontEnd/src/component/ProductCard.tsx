import { Link } from "react-router-dom";
import type { ProductType } from "../data/products";
import ApplePhone from "../assets/Mobiles/Apple.webp";
import WishlistButton from "./ui/WishlistButton";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative text-center rounded-md flex justify-center border border-gray-200 p-5">
     
        <div className="absolute top-2 right-2">
          <WishlistButton/>
        </div>
     
      <Link to={`/product/${product._id}`}>
        <img
          src={ApplePhone}
          alt="ApplePhone"
          className="mb-4  h-[152px] object-contain"
        />
        <h1 className="text-md font-[14px] mb-1 truncate w-36">
          {product.name}
        </h1>
        <p className="text-md font-semibold">From ₹ {product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
