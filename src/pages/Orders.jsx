import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.id) return;
    API.get(`/orders/user/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch(() => {});
  }, [user]);

  return (
    <div className="pt-28 px-3 sm:px-6 bg-[#f1f3f6] min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2874f0] mb-5">
          Your Orders
        </h1>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg border shadow-sm text-center text-gray-600">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-white p-4 sm:p-5 rounded-lg border shadow-sm hover:shadow-md transition-all"
              >
                {/* TOP SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">

                  {/* Left Section */}
                  <div className="space-y-1">
                    <p className="font-semibold text-lg text-gray-800">
                      Order #{o.id}
                    </p>

                    <p className="text-gray-500 text-sm">
                      {new Date(o.createdAt).toLocaleString()}
                    </p>

                    <p className="text-gray-700 text-sm">
                      <b>Type:</b> {o.orderType}
                    </p>

                    <p className="text-gray-700 text-sm">
                      <b>Status: </b>
                      <span
                        className={`font-bold ${
                          o.status === "DELIVERED"
                            ? "text-green-600"
                            : o.status === "CANCELLED"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </p>

                    <p className="text-gray-700 text-sm">
                      <b>Expected Delivery: </b>
                      <span className="font-medium text-gray-900">
                        {new Date(
                          new Date(o.createdAt).getTime() +
                            7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Right Section (Price) */}
                  <div className="flex sm:justify-end items-start sm:items-end">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹
                        {o.orderType === "COD"
                          ? o.totalAmount + 50
                          : o.totalAmount}
                      </p>
                      {o.orderType === "COD" && (
                        <p className="text-xs text-gray-500">
                          + ₹50 COD charge
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ITEMS LIST */}
                <div className="mt-4 border-t pt-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Order Items
                  </p>

                  <div className="space-y-2">
                    {o.orderItems?.map((it) => (
                      <div
                        key={it.id}
                        className="flex justify-between text-sm text-gray-700"
                      >
                        <span className="truncate w-2/3">
                          {it.productName} × {it.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{it.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
