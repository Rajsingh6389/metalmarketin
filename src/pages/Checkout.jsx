import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [orderType, setOrderType] = useState("COD");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const SHOP_ADDRESS =
    "522, Hanspuram, Naubasta, Kanpur Nagar, Uttar Pradesh - 208021";

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");

    if (orderType === "COD") {
      if (!name || !phone || !street || !city || !state || !pincode) {
        return toast.error("Please fill all delivery address fields");
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        return toast.error("Please enter a valid 10-digit phone number");
      }
    }

    if (orderType === "PICKUP") {
      if (!name || !phone) {
        return toast.error("Please enter your name & phone");
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        return toast.error("Please enter a valid 10-digit phone number");
      }
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const items = cart.map(c => ({
        productId: c.id,
        quantity: c.quantity
      }));

      const fullAddress =
        orderType === "COD"
          ? `${name}, ${phone}, ${street}, ${city}, ${state} - ${pincode}`
          : `Pickup Order - ${name}, ${phone}, Shop Address: ${SHOP_ADDRESS}`;

      const payload = {
        userId: user.id,
        orderType,
        items,
        address: fullAddress
      };

      await API.post("/orders", payload);

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      toast.error(err?.response?.data || "Order failed, check login status");
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-dark text-white">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-3xl border border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Checkout</h2>

        {/* Order Type */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Order Type</label>
          <select
            value={orderType}
            onChange={e => setOrderType(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="PICKUP">Pickup from Store</option>
          </select>
        </div>

        {/* COD Form */}
        {orderType === "COD" ? (
          <div className="space-y-4">

            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={e => setStreet(e.target.value)}
                placeholder="House no, Street"
                className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="Pin Code"
                  className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                placeholder="State"
                className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
              />
            </div>
          </div>
        ) : (
          /* PICKUP SECTION */
          <div className="space-y-4">

            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full p-3 bg-gray-800 border border-yellow-500/40 rounded-lg focus:border-yellow-400 outline-none"
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-xl border border-yellow-500/40">
              <p className="text-gray-300 font-semibold">Pickup Location</p>
              <p className="text-gray-400 text-sm mt-1">{SHOP_ADDRESS}</p>
            </div>
          </div>
        )}

        {/* Total & Button */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-gray-300">Total</p>
            {orderType === "COD" ? (
              <p className="text-2xl font-bold text-yellow-400">₹{total + 50}</p>
            ) : (
              <p className="text-2xl font-bold text-yellow-400">₹{total}</p>
            )}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
