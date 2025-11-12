import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.id) return;
    API.get(`/orders/user/${user.id}`).then(res => setOrders(res.data)).catch(()=>{});
  }, [user]);

  return (
    <div className="pt-28 px-6 bg-dark min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-primary font-bold mb-4">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-gray-900 p-6 rounded-xl">No orders yet.</div>
        ) : (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="bg-gray-900 p-4 rounded-xl">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Order #{o.id}</p>
                    <p className="text-gray-400 text-sm">{new Date(o.createdAt).toLocaleString()}</p>
                    <p className="mt-2">Type: <span className="font-medium">{o.orderType}</span></p>
                    <p>Status: <span className="font-medium">{o.status}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{o.totalAmount}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {o.orderItems?.map(it => (
                    <div key={it.id} className="flex justify-between text-sm text-gray-300">
                      <span>{it.productName} x {it.quantity}</span>
                      <span>₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
