"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Thông tin tài khoản nhận tiền của bạn (Thay thông tin thật của bạn vào đây)
const BANK_INFO = {
  BANK_ID: "MB", // Các mã phổ biến: MB, VCB, TCB, ACB, VPB, TPB, BIDV, CTG...
  ACCOUNT_NO: "0987654321", // Số tài khoản ngân hàng của bạn
  ACCOUNT_NAME: "NGUYEN VAN A", // Tên chủ tài khoản (không dấu)
};

const products = [
  { id: 1, name: "Nồi chiên không dầu", price: 1290000, icon: "🍳" },
  { id: 2, name: "Quạt điện thông minh", price: 890000, icon: "🌀" },
  { id: 3, name: "Máy hút bụi gia đình", price: 2490000, icon: "🧹" },
  { id: 4, name: "Máy pha cà phê", price: 1990000, icon: "☕" },
  { id: 5, name: "Nồi cơm điện cao tần", price: 1790000, icon: "🍚" },
  { id: 6, name: "Robot hút bụi", price: 4990000, icon: "🤖" },
  { id: 7, name: "Đèn bàn thông minh", price: 590000, icon: "💡" },
  { id: 8, name: "Kệ để đồ đa năng", price: 790000, icon: "🗄️" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; icon: string; quantity: number }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "qr">("cod");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("homeshop-cart");
    if (savedCart) {
      try {
        const cartObj: Record<number, number> = JSON.parse(savedCart);
        const items = Object.entries(cartObj)
          .map(([id, quantity]) => {
            const p = products.find((item) => item.id === Number(id));
            if (!p) return null;
            return { ...p, quantity };
          })
          .filter(Boolean) as { id: number; name: string; price: number; icon: string; quantity: number }[];
        setCartItems(items);
      } catch {}
    }
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Tạo mã đơn hàng ngẫu nhiên (Ví dụ: HS-8493)
  useEffect(() => {
    setOrderId("HS" + Math.floor(1000 + Math.random() * 9000));
  }, []);

  // URL tạo ảnh VietQR tự động chuẩn hóa ngân hàng Việt Nam
  const qrCodeUrl = `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-compact2.png?amount=${totalAmount}&addInfo=Thanh toan don hang ${orderId}&accountName=${encodeURIComponent(BANK_INFO.ACCOUNT_NAME)}`;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    // Lưu đơn hàng vào danh sách đơn hàng quản lý (LocalStorage)
    const newOrder = {
      id: orderId,
      createdAt: new Date().toLocaleString("vi-VN"),
      customer: formData,
      items: cartItems,
      totalAmount,
      paymentMethod,
      status: paymentMethod === "qr" ? "Chờ chuyển khoản" : "Chờ giao hàng",
    };

    const existingOrders = JSON.parse(localStorage.getItem("homeshop-orders") || "[]");
    localStorage.setItem("homeshop-orders", JSON.stringify([newOrder, ...existingOrders]));

    // Xóa giỏ hàng sau khi đặt thành công
    localStorage.removeItem("homeshop-cart");
    setIsOrdered(true);
  }

  if (isOrdered) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="text-7xl">🎉</div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Đặt hàng thành công!</h1>
        <p className="mt-2 text-gray-600">Mã đơn hàng của bạn là: <strong className="text-blue-600">{orderId}</strong></p>
        
        {paymentMethod === "qr" && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md border max-w-sm w-full">
            <h3 className="font-bold text-gray-800">Quét mã QR để hoàn tất thanh toán</h3>
            <img src={qrCodeUrl} alt="VietQR Thanh Toán" className="mt-4 mx-auto w-full rounded-lg border" />
            <p className="mt-3 text-xs text-gray-500">
              Nội dung chuyển khoản: <strong className="text-red-500">Thanh toan don hang {orderId}</strong>
            </p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Về Trang Chủ
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-100"
          >
            Quản Lý Đơn Hàng (Admin)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 notranslate" translate="no">
            HomeShop
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600">
            ← Quay lại trang chủ
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <h1 className="text-2xl font-bold text-gray-900">Thanh toán đơn hàng ({orderId})</h1>

        {cartItems.length === 0 ? (
          <div className="mt-8 text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
              Quay lại mua sắm
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* THÔNG TIN GIAO HÀNG */}
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">Thông tin giao hàng</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Họ và tên *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912345678"
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ghi chú (Tùy chọn)</label>
                    <textarea
                      name="note"
                      rows={3}
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Ghi chú thêm về đơn hàng..."
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* PHƯƠNG THỨC THANH TOÁN */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">Hình thức thanh toán</h2>
                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 text-blue-600"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-gray-500">Trả tiền mặt trực tiếp cho shipper khi nhận hàng</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "qr"}
                      onChange={() => setPaymentMethod("qr")}
                      className="mt-1 h-4 w-4 text-blue-600"
                    />
                    <div className="w-full">
                      <p className="font-semibold text-gray-800">Chuyển khoản Ngân Hàng / Quét mã VietQR</p>
                      <p className="text-xs text-gray-500">Tự động tạo mã QR chính xác số tiền cần trả</p>
                      
                      {paymentMethod === "qr" && (
                        <div className="mt-4 rounded-xl bg-gray-50 p-4 border text-center">
                          <p className="text-xs font-semibold text-gray-600">Quét QR bằng ứng dụng ngân hàng bất kỳ:</p>
                          <img src={qrCodeUrl} alt="VietQR" className="mt-2 mx-auto w-48 rounded-lg shadow-sm border" />
                          <div className="mt-3 text-left text-xs space-y-1 bg-white p-3 rounded-lg border">
                            <p>🏦 Ngân hàng: <strong>{BANK_INFO.BANK_ID}</strong></p>
                            <p>💳 Số tài khoản: <strong>{BANK_INFO.ACCOUNT_NO}</strong></p>
                            <p>👤 Chủ tài khoản: <strong>{BANK_INFO.ACCOUNT_NAME}</strong></p>
                            <p>💰 Số tiền: <strong className="text-red-500">{formatPrice(totalAmount)}</strong></p>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* TÓM TẮT ĐƠN HÀNG */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-900">Sản phẩm đã chọn</h2>
                <div className="mt-4 max-h-60 overflow-y-auto divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600 font-semibold">Miễn phí</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-red-500">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700"
                >
                  Xác nhận đặt hàng
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}