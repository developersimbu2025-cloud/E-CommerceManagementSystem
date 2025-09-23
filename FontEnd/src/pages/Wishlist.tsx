import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../component/ui/button";

const Wishlist = () => {
  return (
    <div className="px-6 py-5">
      <h2 className="text-2xl font-semibold mb-5">My Wishlist</h2>
      <p className="text-muted-foreground mb-2">1 item saved</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="  bg-white">
          <div className="relative">
            <Link to="/">
              <div className="w-full bg-gray-200 h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </Link>

            <button className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all">
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>

            {/* ✅ Discount badge */}

            <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
              originalPrice
            </div>

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          </div>

          <div className="px-4 py-4">
            <h3 className="font-semibold text-foreground mb-2">
              KitchenAid Stand Mixer
            </h3>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Heart className="w-4 h-4 fill-current text-yellow-400" />
                <span className="text-sm text-muted-foreground ml-1">
                  4.8 (4567)
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ">
              <p className="text-lg font-bold text-foreground">2379</p>

              <p className="text-sm text-muted-foreground line-through">
                originalPrice
              </p>
            </div>
          </div>

          <div className="px-4 ">
            <Button className="text-white bg-[#3e3e3e] flex items-center justify-center w-full py-2 rounded-md mt-2 ">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          <p className="text-xs text-muted-foreground  px-4 py-2">
            Added {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
