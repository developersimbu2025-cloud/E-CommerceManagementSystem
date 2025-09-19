import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout/Layout";
import NotFound from "./pages/NotFound";

import Products from "./pages/Products";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";

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
                <Route path="/product/:id" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
