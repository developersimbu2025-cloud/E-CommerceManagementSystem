import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout/Layout";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./component/PrivateRoute";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import AllCategory from "./pages/AllCategory";
import Wishlist from "./pages/Wishlist";


function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/category/:name" element={<Category />} />
                <Route path="/category" element={<AllCategory />} />
                <Route path="/product/:id" element={<Products />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
