import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
  });
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const [pRes, oRes] = await Promise.all([API.get("/products"), API.get("/orders")]);
    setProducts(pRes.data);
    setOrders(oRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    try {
      if (editing) {
        await API.put(`/products/${editing}`, form);
        toast.success("Product updated");
      } else {
        await API.post("/products", form);
        toast.success("Product created");
      }
      setForm({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
        imageUrl: "",
      });
      setEditing(null);
      load();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleEdit = (p) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
      description: p.description,
      imageUrl: p.imageUrl,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await API.delete(`/products/${id}`);
    toast.success("Product deleted");
    load();
  };

  const updateOrderStatus = async (orderId, status) => {
    await API.put(`/orders/${orderId}/status?status=${status}`);
    toast.success("Order updated");
    load();
  };

  const handleOrderDelete = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      await API.put(`/orders/${orderId}/cancel`);
      toast.success("Order cancelled/deleted successfully");
      load();
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PRODUCTS SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Products</h2>

          {/* Product Form */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-4">
            <div className="grid gap-3">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                className="p-2 bg-gray-800 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
                className="p-2 bg-gray-800 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <button onClick={handleSave} className="px-4 py-2 bg-primary text-dark rounded w-full sm:w-auto hover:bg-primary/80 transition">
                  Save
                </button>
                <button
                  onClick={() => {
                    setForm({
                      name: "",
                      category: "",
                      price: 0,
                      stock: 0,
                      description: "",
                      imageUrl: "",
                    });
                    setEditing(null);
                  }}
                  className="px-4 py-2 bg-red-600 rounded w-full sm:w-auto hover:bg-red-500 transition"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-gray-900 p-4 rounded flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img src={p.imageUrl || "/placeholder.png"} alt={p.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <div className="font-semibold text-lg">{p.name}</div>
                    <div className="text-sm text-gray-400">₹{p.price} • {p.stock} in stock</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-500 text-dark rounded hover:bg-yellow-400 transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDERS SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Orders</h2>

          {/* Revenue & Orders Summary */}
          <div className="bg-gray-900 p-4 rounded-xl mb-4 flex justify-between items-center shadow">
            <div>
              <div className="text-sm text-gray-400">Total Orders</div>
              <div className="text-xl font-bold">{orders.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Revenue</div>
              <div className="text-xl font-bold text-green-500">₹{totalRevenue}</div>
            </div>
          </div>

          {/* Order List */}
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-gray-900 p-4 rounded shadow hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">Order #{o.id}</div>
                    <div className="text-sm text-gray-400">{new Date(o.createdAt).toLocaleString()}</div>
                    <div className="text-sm">User: {o.userId}</div>
                    <div className="text-sm">Type: {o.orderType}</div>
                    <div className="text-sm">
                      Status: <span className="font-medium">{o.status}</span>
                    </div>
                    <div className="text-sm">
                      Address: <span className="font-medium">{o.address}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-3 md:mt-0 items-start md:items-end">
                    <div className="font-bold text-lg">₹{o.totalAmount}</div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => updateOrderStatus(o.id, "CONFIRMED")} className="px-2 py-1 bg-green-600 rounded hover:bg-green-500 transition">
                        Confirm
                      </button>
                      <button onClick={() => updateOrderStatus(o.id, "DELIVERED")} className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500 transition">
                        Delivered
                      </button>
                      <button onClick={() => handleOrderDelete(o.id)} className="px-2 py-1 bg-red-700 rounded hover:bg-red-600 transition">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-300 border-t border-gray-700 pt-2">
                  {o.orderItems?.map((it) => (
                    <div key={it.id} className="flex justify-between py-1">
                      <span>{it.productName} × {it.quantity}</span>
                      <span>₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
