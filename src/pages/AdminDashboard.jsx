import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

// GRAPH IMPORTS
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [orderFilter, setOrderFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
  });

  const [orders, setOrders] = useState([]);
  // Filter Orders by Date Range
const getFilteredOrders = () => {
  const now = new Date();

  if (orderFilter === "today") {
    return orders.filter((o) => {
      const d = new Date(o.createdAt);
      return d.toDateString() === now.toDateString();
    });
  }

  if (orderFilter === "7") {
    return orders.filter((o) => {
      const diff = (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });
  }

  if (orderFilter === "30") {
    return orders.filter((o) => {
      const diff = (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    });
  }

  return orders;
};

const finalOrders = getFilteredOrders();

  // Load products + orders
  const load = async () => {
    try {
      const [pRes, oRes] = await Promise.all([
        API.get("/products"),
        API.get("/orders"),
      ]);
      setProducts(pRes.data);
      setOrders(oRes.data);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Save or Update Product
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

  // Edit product
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

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await API.delete(`/products/${id}`);
    toast.success("Product deleted");
    load();
  };

  // Update Order Status
  const updateOrderStatus = async (orderId, status) => {
    await API.put(`/orders/${orderId}/status?status=${status}`);
    toast.success(`Order marked as ${status}`);
    load();
  };

  // Cancel Order
  const handleOrderDelete = async (orderId) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.put(`/orders/${orderId}/cancel`);
      toast.success("Order cancelled");
      load();
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  // Summary Calculations
  const deliveredCount = orders.filter((o) => o.status === "DELIVERED").length;
  const pendingCount = orders.filter((o) => o.status === "CONFIRMED" || o.status === "PENDING").length;
  const cancelledCount = orders.filter((o) => o.status === "CANCELLED").length;

  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // ------------------ GRAPH DATA ------------------

  // Revenue over time
  const revenueByDate = {};
  orders
    .filter((o) => o.status === "DELIVERED")
    .forEach((o) => {
      const d = new Date(o.createdAt).toLocaleDateString();
      revenueByDate[d] = (revenueByDate[d] || 0) + o.totalAmount;
    });

  const revenueChartData = Object.keys(revenueByDate).map((date) => ({
    date,
    revenue: revenueByDate[date],
  }));

  // Category bar chart
  const categoryCount = {};
  products.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  const categoryChartData = Object.keys(categoryCount).map((c) => ({
    category: c,
    count: categoryCount[c],
  }));

  // Order status pie chart
  const orderStatusChartData = [
    { name: "Delivered", value: deliveredCount },
    { name: "Pending", value: pendingCount },
    { name: "Cancelled", value: cancelledCount },
  ];

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* --------------------------------- PRODUCTS SECTION --------------------------------- */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Products</h2>

          {/* Product Form */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-4">
            <div className="grid gap-3">

              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full"
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full"
              />

              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                className="p-2 bg-gray-800 rounded w-full"
              />

              <input
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
                className="p-2 bg-gray-800 rounded w-full"
              />

              <input
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-2 bg-gray-800 rounded w-full resize-none"
              />

              <div className="flex gap-2 mt-3">
                <button onClick={handleSave}
                  className="px-4 py-2 bg-primary text-dark rounded">
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      name: "",
                      category: "",
                      price: 0,
                      stock: 0,
                      description: "",
                      imageUrl: "",
                    });
                  }}
                  className="px-4 py-2 bg-red-600 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="bg-gray-900 p-4 rounded flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={p.imageUrl || "/placeholder.png"}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-400">₹{p.price} • {p.stock} stock</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-500 rounded">
                    Edit
                  </button>

                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --------------------------------- ORDERS SECTION --------------------------------- */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Orders</h2>

          {/* Summary Cards */}
          <div className="bg-gray-900 p-4 rounded-xl mb-4 grid grid-cols-4 gap-3 text-center">
            <div><div className="text-sm text-gray-400">Total</div><div className="text-xl font-bold">{orders.length}</div></div>
            <div><div className="text-sm text-gray-400">Delivered</div><div className="text-xl font-bold text-green-500">{deliveredCount}</div></div>
            <div><div className="text-sm text-gray-400">Pending</div><div className="text-xl font-bold text-yellow-400">{pendingCount}</div></div>
            <div><div className="text-sm text-gray-400">Cancelled</div><div className="text-xl font-bold text-red-500">{cancelledCount}</div></div>
          </div>

          {/* Revenue */}
          <div className="bg-gray-900 p-4 rounded-xl mb-6 flex justify-between">
            <div className="text-sm text-gray-400">Total Revenue</div>
            <div className="text-xl font-bold text-green-500">₹{totalRevenue}</div>
          </div>

          {/* ---------------- GRAPH SECTION ---------------- */}
          <div className="bg-gray-900 p-5 rounded-xl mb-6">
            <h2 className="text-xl font-bold mb-3">Analytics Dashboard</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Revenue Line Chart */}
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Revenue Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueChartData}>
                    <XAxis dataKey="date" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#00ff88" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Order Status Pie Chart */}
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={orderStatusChartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#eab308" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category Bar Chart */}
              <div className="bg-gray-800 p-4 rounded-xl lg:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Products Per Category</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={categoryChartData}>
                    <XAxis dataKey="category" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-gray-900 p-4 rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="text-lg font-bold">Order #{o.id}</div>
                    <div className="text-sm text-gray-400">{new Date(o.createdAt).toLocaleString()}</div>
                    <div className="text-sm">User: {o.userId}</div>
                    <div className="text-sm">Type: {o.orderType}</div>
                    <div className="text-sm">Status: <b>{o.status}</b></div>
                    <div className="text-sm">Detais: {o.address}</div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <div className="text-lg font-bold">₹{o.orderType === 'COD' ? (o.totalAmount + 50) : o.totalAmount}</div>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => updateOrderStatus(o.id, "CONFIRMED")} className="px-3 py-1 bg-green-600 rounded">Confirm</button>
                      <button onClick={() => updateOrderStatus(o.id, "DELIVERED")} className="px-3 py-1 bg-blue-600 rounded">Delivered</button>
                      <button onClick={() => handleOrderDelete(o.id)} className="px-3 py-1 bg-red-700 rounded">Cancel</button>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-2 border-t border-gray-700 pt-2 text-sm text-gray-300">
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
