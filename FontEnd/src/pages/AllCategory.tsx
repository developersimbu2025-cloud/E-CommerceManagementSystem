import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { getAllProducts } from "../services/productService";
import type { ProductType } from "../data/products";

const AllCategory = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error Fetch Product", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-6 py-5">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>
      <div className="flex gap-5 items-start">
        <aside className="lg:w-64 bg-white p-5">
          <div className="bg-card rounded-lg shadow-card">
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Categories</h4>
              {/* <Label text="radio" htmlFor="radio"/> */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    className="mr-2"
                  />
                  <span className="text-sm">All Products</span>
                </label>

                <label className="flex items-center">
                  <input type="radio" name="category" className="mr-2" />
                  <span className="text-sm">name</span>
                </label>
              </div>
            </div>

            {/* Sort Options */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Sort By</h4>
              <select className="w-full p-2 border border-gray-200 rounded-md">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </aside>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-5 w-full">
          {products.map((ele) => (
            <ProductCard key={ele._id} product={ele} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
