import { useParams } from "react-router-dom";
import ApplePhone from "../assets/Mobiles/Apple.webp";
import { getSingleProduct } from "../services/productService";
import type { ProductType } from "../data/products";
import { useEffect, useState } from "react";
import Button from "../component/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const Products: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const data = await getSingleProduct(id);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={ApplePhone}
            alt="ApplePhone"
            className="w-full p-3 max-h-[400px] object-contain  border border-gray-200 "
          />
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {product?.name}
            </h1>

            {/* ✅ Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold text-foreground">
                ₹{product?.price}
              </span>
              <span className="text-md text-muted-foreground line-through">
                ₹1299
              </span>
            </div>

            {/* ✅ Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product?.description}
            </p>

            {/* ✅ Quantity & Add to Cart */}
            <div className="flex items-center space-x-4 mb-6 w-full">
              <div className="flex items-center border border-gray-300 rounded-lg  ">
                <Button>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">2</span>
                <Button>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Full-Width Add to Cart Button */}
              <Button className="py-2 bg-[#3e3e3e] items-center text-white flex justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex  mb-3">WishlistButton</div>

            {/* ✅ Product Info */}
            <div className="border-t pt-5 border-gray-200">
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="font-medium text-foreground w-24">
                    Category :
                  </dt>
                  <dd className="text-muted-foreground capitalize">
                    {product?.category}
                  </dd>
                </div>
                <div className="flex">
                  <dt className="font-medium text-foreground w-24">Stock : </dt>
                  <dd>In Stock</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
