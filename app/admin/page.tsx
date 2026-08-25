"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Order {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    note: string;
  };
  items: { id: number; name: string; price: number; icon: string; quantity: number }[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("homeshop-orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {}
    }
  }, []);

  function updateStatus(orderId: string, newStatus: string) {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem("homeshop-orders", JSON.stringify(updated));
  }

  function clearAllOrders() {
    if (confirm("Bạn có chắc muốn xóa tất cả đơn hàng?")) {
      setOrders([]);
      localStorage.removeItem("homeshop-orders");
    }
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-slate-900 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-xl font-bold">HomeShop Admin Dashboard</h1>
          </div>
          <Link href="/" className="text-sm font-semibold text-gray-300 hover:text-white">
            ← Xem Trang Chủ
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        {/* THỐNG KÊ NHANH */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-500">Tổng số đơn hàng</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">Tổng doanh thu dự kiến</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-purple-500 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quản lý dữ liệu</p>
              <button
                onClick={clearAllOrders}
                className="mt-2 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-200"
              >
                Xóa tất cả đơn
              </button>
            </div>
          </div>
        </div>

        {/* DANH SÁCH ĐƠN HÀNG */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Danh sách đơn hàng vừa đặt</h2>

          {orders.length === 0 ? (
            <p className="mt-6 text-center text-gray-500 py-8">Chưa có đơn hàng nào được đặt.</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Mã đơn</th>
                    <th className="px-4 py-3">Khách hàng</th>
                    <th className="px-4 py-3">Sản phẩm</th>
                    <th className="px-4 py-3">Tổng tiền</th>
                    <th className="px-4 py-3">Thanh toán</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-bold text-blue-600">
                        {order.id}
                        <div className="text-[10px] font-normal text-gray-400">{order.createdAt}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{order.customer.fullName}</div>
                        <div className="text-xs text-gray-500">{order.customer.phone}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{order.customer.address}</div>
                      </td>
                      <td className="px-4 py-4">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="text-xs">
                            {it.icon} {it.name} x<strong>{it.quantity}</strong>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-4 font-bold text-red-500">{formatPrice(order.totalAmount)}</td>
                      <td className="px-4 py-4 uppercase text-xs font-semibold">
                        {order.paymentMethod === "qr" ? "Mã QR" : "COD"}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none"
                        >
                          <option value="Chờ chuyển khoản">Chờ chuyển khoản</option>
                          <option value="Chờ giao hàng">Chờ giao hàng</option>
                          <option value="Đang giao hàng">Đang giao hàng</option>
                          <option value="Đã hoàn thành">Đã hoàn thành</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}