import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout/Layout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/analytics" element={<Analytics />} />
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
