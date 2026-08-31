"use client";

import React, { useState } from "react";

// Dữ liệu bộ ảnh thực tế Quạt Fujihome BF15
const FUJIHOME_IMAGES = [
  {
    id: "banner-shopee",
    title: "Ảnh Banner Shopee Mall (Đại diện chính)",
    url: "https://cf.shopee.vn/file/vn-11134207-81ztc-mqflf6omt2j04f",
  },
  {
    id: "feature-voice",
    title: "Điều khiển giọng nói tiếng Việt",
    url: "https://fujihomevn.com/images/quat-khong-canh-fujihome-bf15-hepa-voice-luxury-3-1.jpg",
  },
  {
    id: "feature-hepa",
    title: "Hệ thống lọc HEPA 3 lớp",
    url: "https://fujihomevn.com/images/quat-khong-canh-fujihome-bf15-hepa-voice-50w-h-11-639116753349693653.jpg",
  },
  {
    id: "feature-speed",
    title: "32 Cấp gió tinh chỉnh",
    url: "https://fujihomevn.com/images/quat-khong-canh-ket-hop-loc-khong-khi-dieu-khien-giong-noi-fujihome-bf15-hepa-voice--co_50d92164.webp",
  },
  {
    id: "feature-safe",
    title: "An toàn cho trẻ nhỏ & Thiết kế không cánh",
    url: "https://fujihomevn.com/images/quat-khong-canh-loc-khong-khi-fujihome-luxury-bf15-hepa-voice-2.webp",
  },
];

// Danh sách tất cả sản phẩm
const PRODUCTS = [
  {
    id: "fujihome-bf15",
    categoryId: "fan",
    categoryName: "Quạt điện",
    brand: "Fujihome",
    name: "Quạt không cánh lọc khí HEPA Nhập Khẩu FUJIHOME BF15 HEPA VOICE",
    price: 2490000,
    originalPrice: 3500000,
    discount: "-29%",
    rating: "5.0/5 (450)",
    mainImage: FUJIHOME_IMAGES[0].url,
    images: FUJIHOME_IMAGES,
    description: `⭐ MUA HÀNG TẠI FUJIHOME VIỆT NAM - GIAN HÀNG CHÍNH HÃNG CỦA CÔNG TY TNHH FUJIHOME VIỆT NAM !

📌 FUJIHOME VIỆT NAM CAM KẾT:
- Hàng Nhập Khẩu chính hãng, đầy đủ giấy tờ CO-CQ.
- Bảo hành ĐIỆN TỬ theo tem điện tử trên sản phẩm 24 tháng.
- Lỗi 1 đổi 1 trong vòng 7 ngày nếu phát sinh lỗi từ nhà sản xuất.
- Đổi trả miễn phí nếu giao sai hàng hoặc có lỗi NSX.

🚚 GIAO HOẢ TỐC 2H TẠI HÀ NỘI - HỒ CHÍ MINH - ĐÀ NẴNG.

QUẠT KHÔNG CÁNH LỌC KHÔNG KHÍ HEPA FUJIHOME LUXURY BF15-HEPA-VOICE
[ Đối lưu không khí - Lọc không khí 3 lớp - HEPA - UV - Ionizer - Điều khiển thông minh giọng nói ]

✅ ƯU ĐIỂM VƯỢT TRỘI:
• 3 chế độ điều khiển thông minh: Điều khiển giọng nói tiếng Việt + Điều khiển từ xa + Cảm ứng 1 chạm.
• Bộ lọc 3 lớp thông minh HEPA + UV + Ionizer giúp loại bỏ 99.97% bụi mịn và vi khuẩn.
• Động cơ DC Inverter tiết kiệm điện vượt trội, vận hành cực kỳ êm ái.
• 32 mức gió tinh chỉnh và 4 chế độ thông minh (Gió thường, Gió ngủ, Gió trẻ em, Gió Eco).
• Thiết kế không cánh sang trọng, an toàn tuyệt đối cho gia đình có con nhỏ.
• Góc xoay rộng 60 độ giúp làm mát đều khắp không gian phòng.

✅ THÔNG SỐ KỸ THUẬT:
• Điện áp: 220 – 240V / 50 – 60Hz | Công suất: 50W
• Động cơ: Inverter DC tiết kiệm điện | Màn hình: LED
• Số cấp gió: 32 cấp | Hẹn giờ: Tối đa 15 tiếng | Góc xoay: 60°
• Kích thước: 237 x 237 x 1100mm | Trọng lượng: 4.7kg
• Bảo hành: 24 tháng chính hãng`,
  },
  {
    id: "fujihome-p1",
    categoryId: "air-purifier",
    categoryName: "Máy lọc khí",
    brand: "Fujihome",
    name: "Máy Lọc Không Khí Cao Cấp Fujihome AP-01 Lọc Bụi Mịn PM2.5",
    price: 1890000,
    originalPrice: 2500000,
    discount: "-24%",
    rating: "4.8/5 (120)",
    mainImage: "https://fujihomevn.com/images/quat-khong-canh-fujihome-bf15-hepa-voice-50w-h-11-639116753349693653.jpg",
    images: [
      { id: "p1", title: "Máy lọc khí", url: "https://fujihomevn.com/images/quat-khong-canh-fujihome-bf15-hepa-voice-50w-h-11-639116753349693653.jpg" }
    ],
    description: "Máy lọc không khí công suất lớn, lọc sạch PM2.5, khử mùi hiệu quả cho phòng 30m2.",
  },
  {
    id: "fujihome-d1",
    categoryId: "dehumidifier",
    categoryName: "Máy hút ẩm",
    brand: "Fujihome",
    name: "Máy Hút Ẩm Dân Dụng Fujihome DH12 Chống Ẩm Mốc Mùa Nồm",
    price: 3200000,
    originalPrice: 4100000,
    discount: "-22%",
    rating: "4.9/5 (210)",
    mainImage: "https://fujihomevn.com/images/quat-khong-canh-fujihome-bf15-hepa-voice-luxury-3-1.jpg",
    images: [
      { id: "d1", title: "Máy hút ẩm", url: "https://fujihomevn.com/images/quat-khong-canh-fujihome-bf15-hepa-voice-luxury-3-1.jpg" }
    ],
    description: "Máy hút ẩm thông minh, lọc không khí, sấy quần áo nhanh chóng vào mùa mưa nồm.",
  }
];

export default function HomeShop() {
  // Quản lý điều hướng trang: 'home' | 'category' | 'detail'
  const [currentView, setCurrentView] = useState<"home" | "category" | "detail">("detail");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProductId, setSelectedProductId] = useState<string>("fujihome-bf15");
  
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // Sản phẩm đang được chọn xem chi tiết
  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [selectedDetailImage, setSelectedDetailImage] = useState<string>(currentProduct.mainImage);

  // Chuyển danh mục
  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setCurrentView("category");
  };

  // Mở trang chi tiết sản phẩm
  const handleOpenDetail = (prodId: string) => {
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod) {
      setSelectedProductId(prodId);
      setSelectedDetailImage(prod.images[0]?.url || prod.mainImage);
      setQuantity(1);
      setCurrentView("detail");
    }
  };

  const addToCart = () => {
    setCartCount((prev) => prev + quantity);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.categoryId === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-12">
      {/* HEADER TOP NAV */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 
            onClick={() => setCurrentView("home")} 
            className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-1"
          >
            HomeShop
          </h1>

          {/* DANH MỤC TRÊN MENU */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium text-sm">
            <button 
              onClick={() => setCurrentView("home")}
              className={`hover:text-blue-600 transition ${currentView === "home" ? "text-blue-600 font-bold" : ""}`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => handleSelectCategory("fan")}
              className={`hover:text-blue-600 transition ${activeCategory === "fan" && currentView === "category" ? "text-blue-600 font-bold" : ""}`}
            >
              Quạt điện
            </button>
            <button 
              onClick={() => handleSelectCategory("air-purifier")}
              className={`hover:text-blue-600 transition ${activeCategory === "air-purifier" && currentView === "category" ? "text-blue-600 font-bold" : ""}`}
            >
              Máy lọc khí
            </button>
            <button 
              onClick={() => handleSelectCategory("dehumidifier")}
              className={`hover:text-blue-600 transition ${activeCategory === "dehumidifier" && currentView === "category" ? "text-blue-600 font-bold" : ""}`}
            >
              Máy hút ẩm
            </button>
          </nav>

          {/* GIỎ HÀNG */}
          <div className="relative">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-sm font-medium">
              🛒 Giỏ hàng
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH THAY ĐỔI THEO GIAO DIỆN */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* 1. TRANG CHỦ HOẶC TRANG DANH MỤC */}
        {(currentView === "home" || currentView === "category") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">
                {currentView === "home" ? "🔥 Tất Cả Sản Phẩm Nổi Bật" : `Danh Mục: ${PRODUCTS.find(p => p.categoryId === activeCategory)?.categoryName || "Sản Phẩm"}`}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleSelectCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  Tất cả
                </button>
                <button 
                  onClick={() => handleSelectCategory("fan")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === "fan" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  Quạt điện
                </button>
                <button 
                  onClick={() => handleSelectCategory("air-purifier")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === "air-purifier" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  Máy lọc khí
                </button>
              </div>
            </div>

            {/* DANH SÁCH THẺ SẢN PHẨM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  onClick={() => handleOpenDetail(prod.id)}
                  className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden relative border-b">
                    <img 
                      src={prod.mainImage} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        // Ảnh dự phòng chất lượng cao nếu mạng bị chặn
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=800&q=80";
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                      {prod.discount}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{prod.brand}</span>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mt-1 group-hover:text-blue-600 transition">
                        {prod.name}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-red-600">
                          {prod.price.toLocaleString("vi-VN")} đ
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {prod.originalPrice.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. TRANG CHI TIẾT SẢN PHẨM (DETAIL) */}
        {currentView === "detail" && (
          <div className="space-y-6">
            {/* Thanh Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button onClick={() => setCurrentView("home")} className="hover:text-blue-600">Trang chủ</button>
              <span>&gt;</span>
              <button onClick={() => handleSelectCategory(currentProduct.categoryId)} className="hover:text-blue-600">
                {currentProduct.categoryName}
              </button>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium line-clamp-1">{currentProduct.name}</span>
            </div>

            {/* Khối Thông Tin Sản Phẩm Chính */}
            <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 border">
              
              {/* GALLERY HÌNH ẢNH SẢN PHẨM */}
              <div>
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 border flex items-center justify-center relative">
                  <img 
                    src={selectedDetailImage} 
                    alt={currentProduct.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=800&q=80";
                    }}
                  />
                </div>

                {/* Danh sách ảnh nhỏ chuyển đổi */}
                <div className="grid grid-cols-5 gap-2">
                  {currentProduct.images.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedDetailImage(img.url)}
                      className={`aspect-square rounded-lg border overflow-hidden transition relative ${
                        selectedDetailImage === img.url 
                          ? "border-2 border-red-600 shadow-sm opacity-100" 
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img 
                        src={img.url} 
                        alt={img.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=800&q=80";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* THÔNG TIN CHI TIẾT & NÚT MUA HÀNG */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                    <span className="text-blue-700 font-extrabold">[{currentProduct.brand}]</span> {currentProduct.name}
                  </h2>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="text-amber-500 font-bold">⭐ {currentProduct.rating}</span>
                    <span>|</span>
                    <span className="text-green-600 font-medium">Chính hãng FUJIHOME VIỆT NAM</span>
                  </div>

                  {/* Giá sản phẩm */}
                  <div className="bg-red-50/70 p-4 rounded-xl border border-red-100 mb-6 flex items-baseline gap-4">
                    <span className="text-3xl font-extrabold text-red-600">
                      {currentProduct.price.toLocaleString("vi-VN")} đ
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {currentProduct.originalPrice.toLocaleString("vi-VN")} đ
                    </span>
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                      {currentProduct.discount}
                    </span>
                  </div>

                  {/* Ưu đãi & Cam kết */}
                  <div className="space-y-2 text-xs text-gray-700 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-blue-600">✓</span> Hàng Nhập Khẩu chính hãng, đầy đủ giấy tờ CO-CQ.
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-blue-600">✓</span> Bảo hành điện tử chính hãng 24 tháng toàn quốc.
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-blue-600">✓</span> Lỗi 1 đổi 1 trong vòng 7 ngày nếu có lỗi NSX.
                    </div>
                  </div>

                  {/* Bộ chọn số lượng */}
                  <div className="flex items-center gap-4 py-4 border-t border-b text-sm mb-6">
                    <span className="text-gray-600 font-medium">Số Lượng:</span>
                    <div className="flex items-center border rounded-lg bg-white">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="px-3.5 py-1.5 border-r hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-6 py-1.5 font-bold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)} 
                        className="px-3.5 py-1.5 border-l hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mua hàng */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={addToCart} 
                    className="bg-blue-50 text-blue-600 border border-blue-600 font-bold py-3.5 rounded-xl hover:bg-blue-100 transition"
                  >
                    🛒 Thêm Giỏ Hàng
                  </button>
                  <button 
                    onClick={addToCart} 
                    className="bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition shadow-md"
                  >
                    🛍️ MUA NGAY
                  </button>
                </div>
              </div>
            </div>

            {/* Mô tả sản phẩm chi tiết */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
                📝 MÔ TẢ SẢN PHẨM & THÔNG SỐ KỸ THUẬT
              </h3>
              <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
                {currentProduct.description}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
