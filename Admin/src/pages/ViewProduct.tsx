import React from "react";
import type { ProductPayloadType } from "../services/productService";

type ViewProductProps = {
  viewProduct: ProductPayloadType;
  setIsViewOpen: any;
};

const ViewProduct: React.FC<ViewProductProps> = ({
  viewProduct,
  setIsViewOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsViewOpen(false)} // ✅ close modal
        >
          ✕
        </button>
        <div className="space-y-3 text-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Product Details
          </h2>
          <div>
            <strong>ID:</strong> {viewProduct._id}
          </div>
          <div>
            <strong>Name:</strong> {viewProduct.name}
          </div>
          <div>
            <strong>Description:</strong> {viewProduct.description}
          </div>
          <div>
            <strong>Price:</strong> ₹{viewProduct.price}
          </div>
          <div>
            <strong>Original Price:</strong> ₹{viewProduct.originalPrice}
          </div>
          <div>
            <strong>Category:</strong> {viewProduct.category}
          </div>
          <div>
            <strong>Rating:</strong> {viewProduct.rating}
          </div>
          <div>
            <strong>Reviews:</strong> {viewProduct.reviews}
          </div>
          <div>
            <strong>In Stock:</strong> {viewProduct.inStock ? "Yes" : "No"}
          </div>
          <div>
            <strong>Image:</strong>
            <br />
            {viewProduct.image ? (
              <img
                src={
                  viewProduct.image.startsWith("http")
                    ? viewProduct.image
                    : `http://localhost:4000${viewProduct.image}`
                }
                alt={viewProduct.name}
                className="w-32 h-32 object-cover rounded-md mt-2"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 "
              onClick={() => setIsViewOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
