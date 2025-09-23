import { useEffect, useState } from "react";
import Banner from "../assets/banner.webp";
import ProductCard from "../component/ProductCard";
import { getProduct } from "../services/productService";
import { categories, type ProductType } from "../data/products";
import Poster from "../assets/poster.webp";

const Home: React.FC = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="space-y-3 px-3 py-3">
      <div>
        <img src={Banner} className="w-full object-cover" alt="banner" />
      </div>

      <section className="w-full rounded-md bg-white p-4 md:p-6 space-y-5">
        <h2 className="text-xl md:text-1xl font-semibold bg-gray-100 p-2 ">
          {categories.find((item) => item.id === "mobiles")?.name}
        </h2>

        <div className="flex gap-5 items-start">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 flex-1">
            {product.length === 0 ? (
              <p className="text-center text-gray-500">No product available</p>
            ) : (
              product

                .filter((category) => category.category === "mobiles")
                .slice(0, 5)
                .map((item) => <ProductCard key={item._id} product={item} />)
            )}
          </div>

          {/* Poster */}
          <div className="hidden md:flex justify-center">
            <img src={Poster} alt="poster" className="w-48 sm:w-60 md:w-52" />
          </div>
        </div>
      </section>
      <section className="w-full rounded-md bg-white p-4 md:p-6 space-y-5">
        {/* Mobiles Section */}
        <h2 className="text-xl md:text-1xl font-semibold  bg-gray-100 p-2">
          {categories.find((item) => item.id === "appliances")?.name}
        </h2>

        <div className="flex gap-5 items-start">
          {/* Poster */}
          <div className="hidden md:flex justify-center">
            <img src={Poster} alt="poster" className="w-48 sm:w-60 md:w-52" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 flex-1">
            {product.length === 0 ? (
              <p className="text-center text-gray-500">No product available</p>
            ) : (
              product
                .filter((ele) => ele.category === "appliances")
                .map((item) => <ProductCard key={item._id} product={item} />)
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
