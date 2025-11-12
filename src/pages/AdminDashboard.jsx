import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: 0, stock: 0, description: "", imageUrl: "" });
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const [pRes, oRes] = await Promise.all([API.get("/products"), API.get("/orders")]);
    setProducts(pRes.data);
    setOrders(oRes.data);
    console.log(oRes.data);
    
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    try {
      if (editing) {
        await API.put(`/products/${editing}`, form);
        toast.success("Updated");
      } else {
        await API.post("/products", form);
        toast.success("Created");
      }
      setForm({ name:"", category:"", price:0, stock:0, description:"", imageUrl:"" });
      setEditing(null);
      load();
    } catch (err) { toast.error("Save failed"); }
  };

  const handleEdit = (p) => {
    setEditing(p.id);
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, description: p.description, imageUrl: p.imageUrl });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await API.delete(`/products/${id}`);
    toast.success("Deleted");
    load();
  };

  const updateOrderStatus = async (orderId, status) => {
    await API.put(`/orders/${orderId}/status?status=${status}`);
    toast.success("Order updated");
    load();
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-dark text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Products</h2>
          <div className="bg-gray-900 p-4 rounded-xl mb-4">
            <div className="grid gap-2">
              <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                className="p-2 bg-gray-800 rounded" />
              <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                className="p-2 bg-gray-800 rounded" />
              <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})}
                className="p-2 bg-gray-800 rounded" />
              <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form,stock:parseInt(e.target.value)})}
                className="p-2 bg-gray-800 rounded" />
              <input placeholder="Image URL" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})}
                className="p-2 bg-gray-800 rounded" />
              <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
                className="p-2 bg-gray-800 rounded" />
              <div className="flex gap-2">
                <button onClick={handleSave} className="px-4 py-2 bg-primary text-dark rounded">Save</button>
                <button onClick={()=>{ setForm({ name:"", category:"", price:0, stock:0, description:"", imageUrl:"" }); setEditing(null); }} className="px-4 py-2 bg-red-600 rounded">Clear</button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="bg-gray-900 p-3 rounded flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={p.imageUrl || "/placeholder.png"} alt={p.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-400">₹{p.price} • {p.stock} in stock</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>handleEdit(p)} className="px-3 py-1 bg-primary rounded">Edit</button>
                  <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Orders</h2>
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="bg-gray-900 p-3 rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">Order #{o.id}</div>
                    <div className="text-sm text-gray-400">{new Date(o.createdAt).toLocaleString()}</div>
                    <div className="mt-1 text-sm">User: {o.userId}</div>
                    <div className="mt-1">Type: {o.orderType}</div>
                    <div className="mt-1">Status: <span className="font-medium">{o.status}</span></div>
                    <div className="mt-1">Address: <span className="font-medium">{o.address}</span></div>

                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="font-bold">₹{o.totalAmount}</div>
                    <div className="flex gap-2">
                      <button onClick={()=>updateOrderStatus(o.id,"CONFIRMED")} className="px-2 py-1 bg-green-600 rounded">Confirm</button>
                      <button onClick={()=>updateOrderStatus(o.id,"DELIVERED")} className="px-2 py-1 bg-blue-600 rounded">Delivered</button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  {o.orderItems?.map(it => (<div key={it.id} className="flex justify-between"><span>{it.productName} x {it.quantity}</span><span>₹{it.price*it.quantity}</span></div>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
