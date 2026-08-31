"use client";

import React, { useState } from "react";

export default function HomeShop() {
  const [currentView, setCurrentView] = useState<"home" | "category" | "detail">("detail");
  const [selectedCategory, setSelectedCategory] = useState<string>("fan");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // Bộ ảnh chính thức được sắp xếp chuyên nghiệp cho quạt Fujihome BF15
  const FUJIHOME_IMAGES = [
    {
      id: "main-cover",
      title: "Ảnh đại diện chính",
      url: "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=800&q=80", // Thay link ảnh Shopee Mall banner của bạn vào đây
    },
    {
      id: "feature-voice",
      title: "Điều khiển giọng nói",
      url: "https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=800&q=80",
    },
    {
      id: "feature-hepa",
      title: "Màng lọc HEPA 3 lớp",
      url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    },
    {
      id: "feature-speed",
      title: "32 Cấp độ gió",
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<string>(FUJIHOME_IMAGES[0].url);

  // Dữ liệu sản phẩm Quạt Fujihome BF15
  const productDetail = {
    id: "fn-1",
    brand: "Fujihome",
    name: "Quạt không cánh lọc khí HEPA Nhập Khẩu FUJIHOME BF15 HEPA VOICE, Quạt điều khiển giọng nói Inverter tiết kiệm điện",
    price: 2490000,
    originalPrice: 3500000,
    discount: "-29%",
    rating: "5.0/5 (450)",
    images: FUJIHOME_IMAGES,
    description: `⭐ MUA HÀNG TẠI FUJIHOME VIỆT NAM - LÀ GIAN HÀNG CHÍNH HÃNG CỦA CÔNG TY TNHH FUJIHOME VIỆT NAM !

📌 FUJIHOME VIỆT NAM CAM KẾT:
- Hàng Nhập Khẩu chính hãng, đầy đủ giấy tờ CO-CQ.
- Bảo hành ĐIỆN TỬ theo tem điện tử trên sản phẩm (1 - 5 năm tuỳ sản phẩm).
- Lỗi 1 đổi 1 trong vòng 7 ngày nếu phát sinh lỗi từ phía nhà sản xuất.
- Đổi trả miễn phí nếu sản phẩm có lỗi NSX hoặc giao sai hàng.

🚚 GIAO HOẢ TỐC 2H TẠI HÀ NỘI - HỒ CHÍ MINH - ĐÀ NẴNG.

QUẠT KHÔNG CÁNH LỌC KHÔNG KHÍ HEPA FUJIHOME LUXURY BF15-HEPA-VOICE
[ Đối lưu không khí - Lọc không khí 3 lớp - HEPA - UV - Ionizer - Điều khiển thông minh giọng nói ]

✅ ƯU ĐIỂM VƯỢT TRỘI:
• 3 chế độ điều khiển thông minh: Điều khiển giọng nói tiếng Việt + Điều khiển từ xa + Cảm ứng.
• Bộ lọc 3 lớp thông minh HEPA + UV + Ionizer giúp loại bỏ bụi mịn, vi khuẩn, mùi khó chịu.
• Động cơ DC Inverter tiết kiệm điện vượt trội, vận hành êm, không rung lắc.
• Trang bị 32 mức gió và 4 chế độ thông minh (Gió thường, Gió ngủ, Gió trẻ em, Gió thông minh).
• Chức năng tạo ẩm 90ml/h, bình nước 135ml giúp không khí dễ chịu, giảm khô da.
• Thiết kế không cánh hiện đại, an toàn tuyệt đối cho trẻ nhỏ, dễ lau chùi.
• Góc xoay rộng 60 độ giúp làm mát đều khắp phòng.

✅ THÔNG SỐ KỸ THUẬT:
• Điện áp: 220 – 240V / 50 – 60Hz | Công suất: 50W
• Động cơ: Inverter DC tiết kiệm điện | Màn hình: LED
• Số cấp gió: 32 cấp | Hẹn giờ: Tối đa 15 tiếng | Góc xoay: 60°
• Bình nước tạo ẩm: 135ml (Công suất 90ml/h)
• Thân máy: Nhựa ABS cao cấp
• Kích thước sản phẩm: 237 x 237 x 1100mm | Trọng lượng: 4.7kg
• Bảo hành: 24 tháng chính hãng | Xuất xứ: Trung Quốc`,
  };

  const addToCart = () => {
    setCartCount((prev) => prev + quantity);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">HomeShop</h1>
          <nav className="hidden md:flex space-x-4 text-gray-700 font-medium text-sm">
            <button className="hover:text-blue-600">Trang chủ</button>
            <button className="hover:text-blue-600 text-blue-600 font-bold">Quạt điện</button>
            <button className="hover:text-blue-600">Máy lọc khí</button>
            <button className="hover:text-blue-600">Máy hút ẩm</button>
          </nav>
          <div className="relative">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-sm">
              🛒 Giỏ hàng
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Trang chủ</span>
            <span>&gt;</span>
            <span>Quạt điện</span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium line-clamp-1">{productDetail.name}</span>
          </div>

          {/* Product Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 border">
            {/* Gallery Ảnh Sản Phẩm */}
            <div>
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 border flex items-center justify-center relative">
                <img src={selectedImage} alt={productDetail.name} className="w-full h-full object-cover" />
              </div>

              {/* Danh sách ảnh nhỏ lựa chọn */}
              <div className="grid grid-cols-4 gap-2">
                {productDetail.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.url)}
                    className={`aspect-square rounded-lg border overflow-hidden transition relative ${
                      selectedImage === img.url ? "border-2 border-red-600 shadow-sm" : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Thông tin mua hàng */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                  <span className="text-blue-700 font-extrabold">[{productDetail.brand}]</span> {productDetail.name}
                </h2>

                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="text-amber-500 font-bold">⭐ {productDetail.rating}</span>
                  <span>|</span>
                  <span className="text-green-600 font-medium">Chính hãng FUJIHOME</span>
                </div>

                {/* Khối giá */}
                <div className="bg-red-50/70 p-4 rounded-xl border border-red-100 mb-6 flex items-baseline gap-4">
                  <span className="text-3xl font-extrabold text-red-600">
                    {productDetail.price.toLocaleString("vi-VN")} đ
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {productDetail.originalPrice.toLocaleString("vi-VN")} đ
                  </span>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {productDetail.discount}
                  </span>
                </div>

                {/* Cam kết bán hàng */}
                <div className="space-y-2 text-xs text-gray-700 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="text-blue-600">✓</span> Hàng Nhập Khẩu chính hãng, đầy đủ CO-CQ.
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span className="text-blue-600">✓</span> Bảo hành điện tử chính hãng 24 tháng.
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span className="text-blue-600">✓</span> Lỗi 1 đổi 1 trong 7 ngày nếu lỗi từ nhà sản xuất.
                  </div>
                </div>

                {/* Tăng giảm số lượng */}
                <div className="flex items-center gap-4 py-4 border-t border-b text-sm mb-6">
                  <span className="text-gray-600 font-medium">Số Lượng:</span>
                  <div className="flex items-center border rounded-lg bg-white">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3.5 py-1.5 border-r hover:bg-gray-100 font-bold">-</button>
                    <span className="px-6 py-1.5 font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3.5 py-1.5 border-l hover:bg-gray-100 font-bold">+</button>
                  </div>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="grid grid-cols-2 gap-4">
                <button onClick={addToCart} className="bg-blue-50 text-blue-600 border border-blue-600 font-bold py-3.5 rounded-xl hover:bg-blue-100 transition">
                  🛒 Thêm Giỏ Hàng
                </button>
                <button onClick={addToCart} className="bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition shadow-md">
                  🛍️ MUA NGAY
                </button>
              </div>
            </div>
          </div>

          {/* Chi tiết sản phẩm dưới */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
              📝 MÔ TẢ SẢN PHẨM & THÔNG SỐ KỸ THUẬT
            </h3>
            <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
              {productDetail.description}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
