import { Link } from "react-router-dom";
import Button from "../component/ui/button";
import ApplePhone from "../assets/Mobiles/Apple.webp";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

const Cart: React.FC = () => {
  return (
    <div>
      {/* <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Start shopping to add items to your cart.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Go to Shop
        </Link>
      </div> */}

      <div className="min-h-screen py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Your Cart
              </h1>
              <p className="text-muted-foreground">1 in your cart</p>
            </div>
            <Link
              to="/cart"
              className="inline-flex items-center border border-gray-300 rounded-md p-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
          {/* ✅ Cart Items Section */}
          <div className="lg:col-span-2 shadow-md bg-white border border-gray-200 ">
            <div className="bg-card rounded-lg shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Cart Items
                </h2>
                <Button className="border border-gray-300 rounded-md p-2 text-red-500 hover:text-red-700 hover:bg-red-50">
                  Clear All
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={ApplePhone}
                    alt="ApplePhone"
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <Link
                      to={"/"}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      OnePlus 12
                    </Link>
                    <p className="text-sm text-muted-foreground capitalize">
                      mobiles
                    </p>
                    <p className="text-lg font-bold text-foreground mt-1">
                      ₹799
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button className="border border-gray-300 rounded-md p-2">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">2</span>
                    <Button className="border border-gray-300 rounded-md p-2">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* ✅ Remove Button */}
                  <div className="flex text-center items-center gap-3">
                    <p className="font-bold text-foreground">₹799.00</p>
                    <Button className="text-red-500 hover:text-red-700 border border-gray-300 rounded-md p-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* ✅ Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg shadow-card p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal</span>
                      <span>₹ 799.00</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Tax (10%)</span>
                      <span>₹ 79.90</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>₹ 10.00</span>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹ 3000</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#3e3e3e] hover:bg-orange-600 text-white py-3 text-lg">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
