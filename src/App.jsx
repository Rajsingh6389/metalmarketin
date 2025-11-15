import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import  {AuthProvider }from "./context/AuthContext";
import  {CartProvider}  from "./context/CartContext";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import AboutShop from "./components/AboutShop";
import AddedToCart from "./pages/AddedToCart";
import VerificationPageForRaj from "./components/VerificationPageForRaj";

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/AboutShop" element={<AboutShop />} />
            <Route path="/added-to-cart" element={<AddedToCart />} />
            <Route path="/verify" element={<VerificationPageForRaj />} />
            {/* <Route path="/verify?cert=CERT-001-002-A1&name=RitikTiwari" element={<VerificationPageForRitik />} /> */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
