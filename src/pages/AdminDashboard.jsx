// AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

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
  // ---------------- state ----------------
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedTab, setSelectedTab] = useState("products"); // products | orders | analytics | settings
  const [orderFilter, setOrderFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
  });

  // ---------------- load data ----------------
  const load = async () => {
    try {
      const [pRes, oRes] = await Promise.all([API.get("/products"), API.get("/orders")]);
      setProducts(pRes.data || []);
      setOrders(oRes.data || []);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ---------------- helper: compute order total reliably ----------------
  // Uses orderItems[] and includes COD charge if applicable
  const getOrderTotal = (order) => {
    const itemsTotal = (order.orderItems || []).reduce(
      (s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0),
      0
    );
    return itemsTotal + (order.orderType === "COD" ? 50 : 0);
  };

  // ---------------- product handlers (unchanged) ----------------
  const handleSave = async () => {
    try {
      if (editing) {
        await API.put(`/products/${editing}`, form);
        toast.success("Product updated");
      } else {
        await API.post("/products", form);
        toast.success("Product added");
      }
      setEditing(null);
      setForm({ name: "", category: "", price: 0, stock: 0, description: "", imageUrl: "" });
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
      imageUrl: p.imageUrl || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    toast.success("Product deleted");
    load();
  };

  // ---------------- order handlers (unchanged) ----------------
  const updateOrderStatus = async (orderId, status) => {
    await API.put(`/orders/${orderId}/status?status=${status}`);
    toast.success(`Order marked as ${status}`);
    load();
  };

  const handleOrderDelete = async (orderId) => {
    if (!confirm("Cancel this order?")) return;
    try {
      await API.put(`/orders/${orderId}/cancel`);
      toast.success("Order cancelled");
      load();
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  // ---------------- order filtering ----------------
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
        const diffDays = (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      });
    }
    if (orderFilter === "30") {
      return orders.filter((o) => {
        const diffDays = (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24);
        return diffDays <= 30;
      });
    }
    return orders;
  };

  const finalOrders = getFilteredOrders();

  // ---------------- analytics calculations ----------------
  const deliveredCount = orders.filter((o) => o.status === "DELIVERED").length;
  const pendingCount = orders.filter((o) => o.status === "PENDING" || o.status === "CONFIRMED").length;
  const cancelledCount = orders.filter((o) => o.status === "CANCELLED").length;

  // totalRevenue = sum of delivered orders using getOrderTotal
  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + getOrderTotal(o), 0);

  // revenue by date (for line chart) — use getOrderTotal
  const revenueByDate = {};
  orders
    .filter((o) => o.status === "DELIVERED")
    .forEach((o) => {
      const dateKey = new Date(o.createdAt).toLocaleDateString();
      revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + getOrderTotal(o);
    });

  const revenueChartData = Object.keys(revenueByDate)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({
      date,
      revenue: revenueByDate[date],
    }));

  // category data
  const categoryCount = {};
  products.forEach((p) => {
    const c = p.category || "Uncategorized";
    categoryCount[c] = (categoryCount[c] || 0) + 1;
  });

  const categoryChartData = Object.keys(categoryCount).map((c) => ({
    category: c,
    count: categoryCount[c],
  }));

  const orderStatusChartData = [
    { name: "Delivered", value: deliveredCount },
    { name: "Pending", value: pendingCount },
    { name: "Cancelled", value: cancelledCount },
  ];

  // Revenue breakdown: today / 7 days / 30 days / lifetime (delivered only)
  const now = new Date();
  const revenueToday = orders
    .filter((o) => o.status === "DELIVERED" && new Date(o.createdAt).toDateString() === now.toDateString())
    .reduce((s, o) => s + getOrderTotal(o), 0);

  const revenue7Days = orders
    .filter((o) => o.status === "DELIVERED" && (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24) <= 7)
    .reduce((s, o) => s + getOrderTotal(o), 0);

  const revenue30Days = orders
    .filter((o) => o.status === "DELIVERED" && (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24) <= 30)
    .reduce((s, o) => s + getOrderTotal(o), 0);

  // ---------------- UI ----------------
  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-5 sticky top-20">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Admin Menu</h3>

            <nav className="space-y-2">
              <button
                onClick={() => setSelectedTab("products")}
                className={`w-full text-left px-3 py-2 rounded-md font-medium ${selectedTab === "products" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-50"}`}
              >
                Products
              </button>

              <button
                onClick={() => setSelectedTab("orders")}
                className={`w-full text-left px-3 py-2 rounded-md font-medium ${selectedTab === "orders" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-50"}`}
              >
                Orders
              </button>

              <button
                onClick={() => setSelectedTab("analytics")}
                className={`w-full text-left px-3 py-2 rounded-md font-medium ${selectedTab === "analytics" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-50"}`}
              >
                Analytics
              </button>

              <button
                onClick={() => setSelectedTab("settings")}
                className={`w-full text-left px-3 py-2 rounded-md font-medium ${selectedTab === "settings" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-50"}`}
              >
                Settings
              </button>
            </nav>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-2 text-center">
              <div className="bg-blue-50 rounded p-2">
                <div className="text-xs text-gray-600">Products</div>
                <div className="font-semibold">{products.length}</div>
              </div>
              <div className="bg-green-50 rounded p-2">
                <div className="text-xs text-gray-600">Delivered</div>
                <div className="font-semibold">{deliveredCount}</div>
              </div>
              <div className="bg-yellow-50 rounded p-2">
                <div className="text-xs text-gray-600">Pending</div>
                <div className="font-semibold">{pendingCount}</div>
              </div>
              <div className="bg-red-50 rounded p-2">
                <div className="text-xs text-gray-600">Cancelled</div>
                <div className="font-semibold">{cancelledCount}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="lg:col-span-9 space-y-6">

          {/* PRODUCTS */}
          {selectedTab === "products" && (
            <section className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold text-blue-600 mb-3">{editing ? "Edit Product" : "Add Product"}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 border rounded" />
                  <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="p-2 border rounded" />
                  <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} className="p-2 border rounded" />
                  <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })} className="p-2 border rounded" />
                  <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="p-2 border rounded sm:col-span-2" />
                  <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-2 border rounded sm:col-span-2 h-24" />
                </div>

                <div className="mt-4 flex gap-3">
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                  <button onClick={() => { setEditing(null); setForm({ name: "", category: "", price: 0, stock: 0, description: "", imageUrl: "" }); }} className="px-4 py-2 bg-gray-200 rounded">Clear</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Products List</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Stock</th>
                        <th className="p-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => (
                        <tr key={p.id} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                          <td className="p-2 border">{i + 1}</td>
                          <td className="p-2 border"><img src={p.imageUrl || "/placeholder.png"} alt={p.name} className="w-12 h-12 object-cover rounded" /></td>
                          <td className="p-2 border">{p.name}</td>
                          <td className="p-2 border text-gray-600">{p.category}</td>
                          <td className="p-2 border">₹{p.price}</td>
                          <td className="p-2 border">{p.stock}</td>
                          <td className="p-2 border">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(p)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
                              <button onClick={() => handleDelete(p.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ORDERS */}
          {selectedTab === "orders" && (
            <section className="space-y-6">
              {/* Summary + Revenue */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                  <div className="text-sm text-gray-600">Total Orders</div>
                  <div className="text-2xl font-semibold">{orders.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                  <div className="text-sm text-gray-600">Delivered</div>
                  <div className="text-2xl font-semibold text-green-600">{deliveredCount}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                  <div className="text-sm text-gray-600">Pending</div>
                  <div className="text-2xl font-semibold text-yellow-600">{pendingCount}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                  <div className="text-sm text-gray-600">Cancelled</div>
                  <div className="text-2xl font-semibold text-red-600">{cancelledCount}</div>
                </div>
              </div>

              {/* Revenue Box (Orders tab) */}
              <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Revenue (Delivered)</div>
                  <div className="text-2xl font-bold text-green-600">₹{totalRevenue}</div>
                </div>
                <div className="text-sm text-gray-600">Includes only delivered orders</div>
              </div>

              {/* Filter */}
              <div className="flex gap-3 items-center">
                <label className="text-gray-600">Filter:</label>
                <select value={orderFilter} onChange={(e) => setOrderFilter(e.target.value)} className="p-2 border rounded">
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                </select>
              </div>

              {finalOrders.map((o) => (
                <div key={o.id} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">Order #{o.id}</div>
                      <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                      <div className="text-sm">User: {o.userId}</div>
                      <div className="text-sm">Type: {o.orderType} • Status: <b>{o.status}</b></div>
                      <div className="text-sm">Address: {o.address}</div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="text-xl font-bold">₹{getOrderTotal(o)}</div>
                      {o.orderType === "COD" && <div className="text-xs text-gray-500">Includes ₹50 COD charge</div>}
                      <div className="flex gap-2 flex-wrap mt-2">
                        <button onClick={() => updateOrderStatus(o.id, "CONFIRMED")} className="px-3 py-1 bg-green-600 text-white rounded">Confirm</button>
                        <button onClick={() => updateOrderStatus(o.id, "DELIVERED")} className="px-3 py-1 bg-blue-600 text-white rounded">Delivered</button>
                        <button onClick={() => handleOrderDelete(o.id)} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 border-t pt-2 text-sm">
                    {o.orderItems?.map((it) => (
                      <div key={it.id || `${it.productName}-${Math.random()}`} className="flex justify-between py-1">
                        <span>{it.productName} × {it.quantity}</span>
                        <span>₹{(it.price || 0) * (it.quantity || 0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* ANALYTICS */}
          {selectedTab === "analytics" && (
            <section className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <h2 className="text-2xl font-semibold text-blue-600">Analytics</h2>

                  {/* Revenue breakdown card (big) */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 w-full md:w-auto">
                    <div className="bg-green-50 p-3 rounded text-center">
                      <div className="text-sm text-gray-700">Today</div>
                      <div className="font-semibold">₹{revenueToday}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded text-center">
                      <div className="text-sm text-gray-700">Last 7 Days</div>
                      <div className="font-semibold">₹{revenue7Days}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded text-center">
                      <div className="text-sm text-gray-700">Last 30 Days</div>
                      <div className="font-semibold">₹{revenue30Days}</div>
                    </div>
                    <div className="bg-white p-3 rounded border text-center">
                      <div className="text-sm text-gray-700">Total (Delivered)</div>
                      <div className="font-semibold text-green-600">₹{totalRevenue}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 p-4 rounded border">
                    <h3 className="font-medium mb-2">Revenue Over Time</h3>
                    <div style={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueChartData}>
                          <XAxis dataKey="date" tick={{ fill: "#334155" }} />
                          <YAxis tick={{ fill: "#334155" }} />
                          <Tooltip contentStyle={{ background: "#fff", color: "#000" }} />
                          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border">
                    <h3 className="font-medium mb-2">Order Status</h3>
                    <div style={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={orderStatusChartData} dataKey="value" nameKey="name" outerRadius={80} label>
                            <Cell fill="#22c55e" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Tooltip contentStyle={{ background: "#fff", color: "#000" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border lg:col-span-2">
                    <h3 className="font-medium mb-2">Products Per Category</h3>
                    <div style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryChartData}>
                          <XAxis dataKey="category" tick={{ fill: "#334155" }} />
                          <YAxis tick={{ fill: "#334155" }} />
                          <Tooltip contentStyle={{ background: "#fff", color: "#000" }} />
                          <Legend />
                          <Bar dataKey="count" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SETTINGS */}
          {selectedTab === "settings" && (
            <section className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold text-blue-600">Settings</h2>
              <p className="text-gray-700">Settings will be available here soon.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
