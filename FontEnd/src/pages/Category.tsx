import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import { type ProductType } from "../data/products";
import ProductCategoryCard from "../component/ProductCategoryCard";

const Category: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [product, setProduct] = useState<ProductType[]>([]);

  // Fetch products once when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category name
  const categoryProducts = useMemo(() => {
    return product.filter((ele) => ele.category === name);
  }, [name, product]);

  return (
    <div>
      <div className="px-6 py-5">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 capitalize">
          {name || "Category"}
        </h2>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {categoryProducts.map((product) => (
              <ProductCategoryCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
