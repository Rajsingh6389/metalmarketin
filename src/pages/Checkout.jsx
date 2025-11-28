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

    if (orderType === "UPI") {
      return toast.error("UPI Payment Coming Soon!");
    }

    if (!name || !phone) return toast.error("Name & Phone Required");

    if (!/^[6-9]\d{9}$/.test(phone))
      return toast.error("Enter valid 10-digit phone number");

    if (orderType === "COD") {
      if (!street || !city || !state || !pincode)
        return toast.error("Fill complete address");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const items = cart.map((c) => ({
        productId: c.id,
        quantity: c.quantity,
      }));

      const fullAddress =
        orderType === "COD"
          ? `${name}, ${phone}, ${street}, ${city}, ${state} - ${pincode}`
          : `Pickup - ${name}, ${phone}. Store: ${SHOP_ADDRESS}`;

      const payload = {
        userId: user.id,
        orderType,
        items,
        address: fullAddress,
      };

      // ✅ FIX: TOKEN WAS MISSING
      const token = localStorage.getItem("token");
      console.log(token);
      

      await API.post("/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Order Placed!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      toast.error("Order failed, login required");
    }
  };

  return (
    <div className="pt-28 px-4 sm:px-6 min-h-screen bg-[#f1f3f6]">

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border">

        <h2 className="text-2xl font-bold text-[#2874f0] mb-4">
          Checkout
        </h2>

        {/* Order Type */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Order Type
          </label>

          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full p-3 border rounded-md bg-gray-50 focus:border-[#2874f0] outline-none"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="PICKUP">Pickup From Store</option>
            <option value="UPI">UPI Payment (Coming Soon)</option>
          </select>
        </div>

        {/* UPI COMING SOON */}
        {orderType === "UPI" && (
          <div className="bg-blue-50 border border-blue-300 text-blue-700 p-4 rounded-md mb-4 shadow-sm">
            <b>UPI Payment Coming Soon!</b>
            <p className="text-sm mt-1">
              Currently available: Cash on Delivery & Store Pickup
            </p>
          </div>
        )}

        {/* COD SECTION */}
        {orderType === "COD" && (
          <div className="space-y-4">

            <Input label="Full Name" value={name} setValue={setName} />
            <Input
              label="Phone Number"
              value={phone}
              setValue={setPhone}
              maxLength={10}
            />
            <Input
              label="Street Address"
              value={street}
              setValue={setStreet}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input label="City" value={city} setValue={setCity} />
              <Input label="Pincode" value={pincode} setValue={setPincode} />
            </div>

            <Input label="State" value={state} setValue={setState} />
          </div>
        )}

        {/* PICKUP SECTION */}
        {orderType === "PICKUP" && (
          <div className="space-y-4">
            <Input label="Full Name" value={name} setValue={setName} />
            <Input
              label="Phone Number"
              value={phone}
              setValue={setPhone}
              maxLength={10}
            />

            <div className="p-4 bg-gray-50 rounded-md border">
              <p className="font-semibold text-gray-700">Pickup Store</p>
              <p className="text-sm text-gray-600 mt-1">{SHOP_ADDRESS}</p>
            </div>
          </div>
        )}

        {/* TOTAL & BUTTON */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-gray-600 text-sm">Total Amount</p>
            <p className="text-2xl font-bold text-[#2874f0]">
              ₹{orderType === "COD" ? total + 50 : total}
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="px-6 py-3 bg-[#fb641b] text-white rounded-lg font-semibold hover:bg-[#d75a18] transition-all shadow-sm"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT COMPONENT */
function Input({ label, value, setValue, ...rest }) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        {...rest}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border rounded-md bg-gray-50 focus:border-[#2874f0] outline-none"
      />
    </div>
  );
}
