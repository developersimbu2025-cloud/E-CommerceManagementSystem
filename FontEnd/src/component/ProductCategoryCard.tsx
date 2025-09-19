import type { ProductType } from "../data/products";
import ApplePhone from "../assets/Mobiles/Apple.webp";

type ProductCardProps = {
  product: ProductType;
};

const ProductCategoryCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative flex flex-col sm:flex-row bg-white shadow p-5 rounded-lg justify-between gap-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4 flex-1">
        {/* Image */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <img
          src={ApplePhone}
          alt="ApplePhone"
          className="mb-4  h-[152px] object-contain"
        />
        </div>

        {/* Product Info */}
        <div className=" flex flex-col justify-center">
          <h1 className="text-md sm:text-xl font-semibold text-gray-800 ">
            {product.name} 
          </h1>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      </div>

      {/* Right Side: Price */}
      <div className="flex flex-col items-start sm:items-end ">
        <span className="text-lg sm:text-xl font-bold text-foreground">
          ₹{product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
