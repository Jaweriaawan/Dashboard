'use client'

import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProtectedRoute from "../protectedRoute/page";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  total: number;
  orderDate: string;
  status: string | null;
  cartItems: { productName: string; image: string }[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
         _id,
         firstName,
         lastName,
         phone,
         email,
         address,
         city,
         zipCode,
         total,
         orderDate,
         status,
         cartItems[] -> {
           productName , image
         }
        }`
      )
      .then((data) => setOrders(data))
      .catch((error) => console.log("Error fetching orders", error));
  }, []);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete order", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      Swal.fire("Updated", `Order marked as ${newStatus}.`, "success");
    } catch (error) {
      Swal.fire("Error", "Failed to change status", "error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-100 p-4">
        <nav className="bg-black text-white p-4 shadow-lg rounded-lg flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold">Admin Dashboard</p>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            {["All", "pending", "success", "dispatch"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === status
                    ? "bg-white text-black font-semibold"
                    : "text-white hover:bg-gray-700"
                }`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 overflow-auto mt-4">
          <p className="text-xl font-semibold mb-2">ORDERS</p>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Customer</th>
                  <th className="p-2">City</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <td className="p-2">{order.firstName} {order.lastName}</td>
                      <td className="p-2">{order.city}</td>
                      <td className="p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="p-2">
                        <select
                          value={order.status || ""}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-gray-200 p-1 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="success">Success</option>
                          <option value="dispatch">Dispatch</option>
                        </select>
                      </td>
                      <td className="p-2">${order.total}</td>
                      <td className="p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(order._id);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {selectedOrderId === order._id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4">
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>Address:</strong> {order.address}, {order.city}, {order.zipCode}</p>
                          <p className="font-semibold mt-2">Order Items:</p>
                          <ul>
                            {order.cartItems.map((item) => (
                              <li key={item.productName} className="flex items-center gap-2 mt-1">
                                {item.productName}
                                {item.image && (
                                  <Image src={urlFor(item.image).url()} alt={item.productName} width={50} height={50} />
                                )}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
