import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToWhislist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import type { Product } from "../../data/products";
import Button from "./button";

type WishlistButtonProps = {
  product: Product;
  showText?: boolean;
};

const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  showText = false,
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  // ✅ Check if this product is already in the wishlist
  const isInWishlist = useMemo(
    () => wishlistItems.some((item) => item.id === product.id),
    [wishlistItems, product.id]
  );

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWhislist({ ...product, dateAdded: new Date().toISOString() })
      );
    }
  };

  return (
    <Button
      onClick={toggleWishlist}
      className={`border border-[#e5e7eb] text-sm px-4 py-2 rounded-md flex items-center ${
        isInWishlist ? "text-red-500 hover:text-red-600" : ""
      }`}
    >
      <Heart
        className={`w-4 h-4 ${showText ? "mr-1" : ""} ${
          isInWishlist ? "fill-current" : ""
        }`}
      />
      {showText &&
        (isInWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
    </Button>
  );
};

export default WishlistButton;
