"use client";

import React, { useState } from "react";

export default function HomeShop() {
  // State quản lý luồng màn hình: null (Trang chủ) | 'rice-cooker-category' (Danh mục Nồi cơm) | object (Chi tiết 1 sản phẩm)
  const [currentView, setCurrentView] = useState<"home" | "rice-cooker-category" | "product-detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // Bộ ảnh thực tế của Robot hút bụi Ecovacs Deebot N30
  const robotImages = [
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5a4j60cb",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5b0u843c",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5b28sk8c",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5e6m80c8",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5e57nk97",
  ];

  // Bộ ảnh Nồi cơm điện LocknLock
  const locknLockImages = [
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8c60r9c267",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8fpvdez1fb",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8jx0dl3j41",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc82vi2dqm47",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc87p4fhu3c9",
  ];

  // Danh sách nhiều Nồi cơm điện (Xuất hiện khi bấm vào danh mục)
  const riceCookersList = [
    {
      id: "rc-1",
      brand: "Perfect",
      name: "Perfect Nồi Cơm Điện PF-C105 1.2 Lít",
      price: 199000,
      originalPrice: 499000,
      discount: "-60%",
      rating: "5/5 (29)",
      badge: "GIẢM KINH HOÀNG 50%",
      stockText: "Còn 8/100 suất",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnp6n25t263n89",
      description: "Dung tích 1.2L, công suất 500W, lòng nồi chống dính, nấu cơm & giữ ấm tiện lợi.",
      images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnp6n25t263n89"],
      specs: [
        { label: "Thương hiệu", value: "Perfect" },
        { label: "Dung tích", value: "1.2 Lít" },
        { label: "Công suất", value: "500W" },
        { label: "Công nghệ nấu", value: "1D" },
      ]
    },
    {
      id: "rc-2",
      brand: "Panasonic",
      name: "Panasonic Nồi Cơm Điện SR-MVN18LRAX 1.8 Lít",
      price: 1210000,
      originalPrice: 1500000,
      discount: "-20%",
      rating: "4.9/5 (138)",
      tag: "Trả Chậm 0% | Trả trước 0Đ",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7q0vzf1",
      description: "Dung tích 1.8L phù hợp 4-6 người, công suất 650W, 2 chế độ nấu tự động.",
      images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7q0vzf1"],
      specs: [
        { label: "Thương hiệu", value: "Panasonic" },
        { label: "Dung tích", value: "1.8 Lít" },
        { label: "Công suất", value: "650W" },
      ]
    },
    {
      id: "rc-3",
      brand: "Sunhouse",
      name: "Sunhouse Nồi Cơm Điện SHD8213 1.2 Lít",
      price: 449000,
      originalPrice: 690000,
      discount: "-35%",
      rating: "4.9/5 (240)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7s5gf9b",
      description: "Thiết kế hiện đại, lòng nồi hợp kim nhôm chống dính siêu bền.",
      images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7s5gf9b"],
      specs: [
        { label: "Thương hiệu", value: "Sunhouse" },
        { label: "Dung tích", value: "1.2 Lít" },
        { label: "Công suất", value: "500W" },
      ]
    },
    {
      id: "rc-4",
      brand: "Toshiba",
      name: "Toshiba Nồi Cơm Điện RC-10JFM(H)VN 1 Lít",
      price: 590000,
      originalPrice: 740000,
      discount: "-19%",
      rating: "4.8/5 (301)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7tl0v8a",
      description: "Nồi cơm điện nắp gài Toshiba truyền nhiệt nhanh, giữ ấm lâu lên tới 12 giờ.",
      images: ["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7tl0v8a"],
      specs: [
        { label: "Thương hiệu", value: "Toshiba" },
        { label: "Dung tích", value: "1.0 Lít" },
        { label: "Công suất", value: "500W" },
      ]
    },
    {
      id: "rc-5",
      brand: "LocknLock",
      name: "Nồi cơm điện LocknLock Daily rice cooker EJR472BLK 1.8L",
      price: 1790000,
      originalPrice: 2090000,
      discount: "-14%",
      rating: "4.9/5 (512)",
      image: locknLockImages[0],
      images: locknLockImages,
      description: "Dung tích 1.8L, lòng nồi chống dính cao cấp, gia nhiệt đều giúp cơm chín ngon tròn vị.",
      highlights: [
        "DUNG TÍCH LỚN 1.8L – Lý tưởng cho gia đình từ 4 đến 6 người.",
        "LÒNG NỒI CHỐNG DÍNH – Chống bám dính hiệu quả, lau chùi vệ sinh cực kỳ dễ dàng.",
        "GIA NHIỆT ĐỀU – Mâm nhiệt tối ưu giúp cơm chín đều, tơi xốp.",
      ],
      specs: [
        { label: "Thương hiệu", value: "LocknLock" },
        { label: "Mã sản phẩm", value: "EJR472BLK" },
        { label: "Dung tích", value: "1.8 Lít" },
      ]
    }
  ];

  // Danh sách các thẻ chính ngoài Trang chủ
  const homeProducts = [
    {
      id: "1",
      name: "Robot hút bụi",
      fullName: "[Chính Hãng] Ecovacs Deebot N30 | Robot hút bụi lau nhà | Lực hút 10.000Pa",
      price: 1790000,
      originalPrice: 2090000,
      image: robotImages[0],
      images: robotImages,
      description: "Tự động hút bụi, lau nhà và quay về trạm sạc.",
      isCategory: false,
    },
    {
      id: "2",
      name: "Nồi cơm điện",
      price: 199000,
      originalPrice: 499000,
      image: locknLockImages[0],
      description: "Đa dạng các dòng nồi cơm điện cao cấp Panasonic, Toshiba, Sunhouse, LocknLock...",
      isCategory: true, // Khi bấm vào sẽ mở Danh mục nhiều nồi cơm điện
    },
    {
      id: "3",
      name: "Đèn bàn thông minh",
      price: 590000,
      originalPrice: 750000,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
      description: "Điều chỉnh độ sáng, bảo vệ mắt khi học tập.",
      isCategory: false,
    },
    {
      id: "4",
      name: "Kệ để đồ đa năng",
      price: 790000,
      originalPrice: 950000,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80",
      description: "Kệ nhiều tầng phù hợp phòng bếp và phòng khách.",
      isCategory: false,
    },
  ];

  const handleProductClick = (item: any) => {
    if (item.isCategory) {
      setCurrentView("rice-cooker-category");
    } else {
      setSelectedProduct(item);
      setSelectedImage(item.images ? item.images[0] : item.image);
      setQuantity(1);
      setCurrentView("product-detail");
    }
  };

  const handleSelectRiceCooker = (item: any) => {
    setSelectedProduct(item);
    setSelectedImage(item.images ? item.images[0] : item.image);
    setQuantity(1);
    setCurrentView("product-detail");
  };

  const addToCart = () => {
    setCartCount((prev) => prev + quantity);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-12">
      {/* Header Navigation */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 
            onClick={() => setCurrentView("home")} 
            className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-2"
          >
            HomeShop
          </h1>
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <button onClick={() => setCurrentView("home")} className="hover:text-blue-600">Trang chủ</button>
            <button onClick={() => setCurrentView("rice-cooker-category")} className="hover:text-blue-600">Nồi cơm điện</button>
            <a href="#" className="hover:text-blue-600">Khuyến mãi</a>
            <a href="#" className="hover:text-blue-600">Liên hệ</a>
          </nav>
          <div className="relative">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
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

        {/* 1. TRANG DANH MỤC NỒI CƠM ĐIỆN (Giống ảnh mẫu bạn gửi) */}
        {currentView === "rice-cooker-category" && (
          <div className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span onClick={() => setCurrentView("home")} className="cursor-pointer hover:underline">Trang chủ</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-semibold">Danh mục Nồi cơm điện</span>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🍚 Tất cả sản phẩm Nồi cơm điện
              </h2>

              {/* Grid danh sách nhiều loại Nồi cơm điện */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {riceCookersList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectRiceCooker(item)}
                    className="border rounded-lg bg-white p-3 flex flex-col justify-between hover:shadow-lg transition cursor-pointer relative group"
                  >
                    {/* Badge Trả chậm / Giảm giá */}
                    {item.tag && (
                      <span className="absolute top-2 left-2 bg-gray-100 text-gray-700 text-[10px] px-1.5 py-0.5 rounded border border-gray-300 font-medium">
                        {item.tag}
                      </span>
                    )}

                    <div>
                      <div className="aspect-square bg-white rounded-md overflow-hidden mb-2 flex items-center justify-center p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition" />
                      </div>

                      <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 min-h-[32px]">
                        <span className="font-bold text-blue-700">{item.brand}</span> {item.name.replace(item.brand, "")}
                      </h3>

                      <div className="mt-2">
                        <div className="text-xs text-blue-600 font-semibold">Gợi ý giảm thêm qua hotline</div>
                        <div className="text-sm font-bold text-red-600 mt-0.5">
                          {item.price.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <span className="line-through">{item.originalPrice.toLocaleString("vi-VN")}đ</span>
                          <span className="text-blue-600 font-bold">{item.discount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t text-[11px] text-gray-500 space-y-1">
                      <div className="text-blue-600 flex items-center gap-1">
                        👍 Hoàn tiền nếu siêu thị khác Rẻ hơn
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-amber-500 font-medium">⭐ {item.rating}</span>
                        <span className="text-gray-400 hover:text-blue-600">+ So sánh</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. TRANG CHI TIẾT SẢN PHẨM */}
        {currentView === "product-detail" && selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span onClick={() => setCurrentView("home")} className="cursor-pointer hover:underline">Trang chủ</span>
              <span>&gt;</span>
              <span onClick={() => setCurrentView("rice-cooker-category")} className="cursor-pointer hover:underline">Nồi cơm điện</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 border flex items-center justify-center p-4">
                  <img src={selectedImage} alt={selectedProduct.name} className="w-full h-full object-contain" />
                </div>
                {selectedProduct.images && (
                  <div className="grid grid-cols-5 gap-2">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-square rounded-md overflow-hidden border-2 ${
                          selectedImage === img ? "border-red-500" : "border-transparent"
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">
                    {selectedProduct.fullName || selectedProduct.name}
                  </h2>

                  <div className="flex items-center gap-3 my-4">
                    <span className="text-3xl font-bold text-red-600">
                      {selectedProduct.price.toLocaleString("vi-VN")} đ
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {selectedProduct.originalPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{selectedProduct.description}</p>

                  <div className="space-y-3 py-4 border-t border-b text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 w-24">Số Lượng:</span>
                      <div className="flex items-center border rounded-md">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 border-r hover:bg-gray-100">-</button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 border-l hover:bg-gray-100">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button onClick={addToCart} className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
                    🛒 Thêm Vào Giỏ Hàng
                  </button>
                  <button onClick={addToCart} className="bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700">
                    🛍️ Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TRANG CHỦ BAN ĐẦU */}
        {currentView === "home" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {homeProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between hover:shadow-md transition cursor-pointer"
                  onClick={() => handleProductClick(p)}
                >
                  <div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {p.isCategory ? "DANH MỤC" : "SALE"}
                      </span>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-red-600 font-bold">
                        {p.isCategory ? "Xem danh sách" : `${p.price.toLocaleString("vi-VN")} đ`}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(p);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      {p.isCategory ? "Xem tất cả nồi cơm" : "Thêm vào giỏ"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
