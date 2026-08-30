"use client";

import React, { useState } from "react";

export default function HomeShop() {
  // State quản lý màn hình: 'home' | 'category' | 'detail'
  const [currentView, setCurrentView] = useState<"home" | "category" | "detail">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // --- DỮ LIỆU SẢN PHẨM CÁC DANH MỤC ---

  // 1. Nồi & Chảo Inox (Danh mục mới thêm - Chờ bạn gửi thông tin/hình ảnh chính thức)
  const cookwareProducts = [
    {
      id: "cw-1",
      brand: "Sunhouse",
      name: "Bộ Nồi Inox 3 Đáy Cao Cấp Sunhouse SH781",
      price: 650000,
      originalPrice: 890000,
      discount: "-27%",
      rating: "4.9/5 (150)",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&q=80",
      description: "Chất liệu inox cao cấp, đáy 3 lớp truyền nhiệt nhanh, dùng được trên mọi loại bếp kể cả bếp từ.",
    },
    {
      id: "cw-2",
      brand: "Elmich",
      name: "Chảo Chống Dính Inox Elmich Max A 26cm",
      price: 390000,
      originalPrice: 520000,
      discount: "-25%",
      rating: "4.8/5 (210)",
      image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=500&q=80",
      description: "Lòng chảo phủ chống dính Bỉ siêu bền, tay cầm chống nóng an toàn, xào nấu tiện lợi.",
    },
    {
      id: "cw-3",
      brand: "Fissler",
      name: "Nồi Inox Nguyên Khối Fissler Original-Profi Collection 20cm",
      price: 2450000,
      originalPrice: 3100000,
      discount: "-21%",
      rating: "5.0/5 (85)",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&q=80",
      description: "Thép không gỉ 18/10 chuẩn Đức, phân bổ nhiệt đều 360 độ, không bị cong vênh theo thời gian.",
    }
  ];

  // 2. Lò vi sóng
  const microwaveProducts = [
    {
      id: "mw-1",
      brand: "Sharp",
      name: "Sharp Lò Vi Sóng Có Nướng R-G222VN-S 20 Lít",
      price: 1390000,
      originalPrice: 1790000,
      discount: "-22%",
      rating: "4.9/5 (180)",
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80",
      description: "Dung tích 20L, công suất vi sóng 800W + nướng 1000W, 5 mức công suất điều chỉnh cơ dễ dàng.",
    },
    {
      id: "mw-2",
      brand: "Toshiba",
      name: "Toshiba Lò Vi Sóng Điện Tử MW2-MM24PC(BK) 24 Lít",
      price: 1990000,
      originalPrice: 2500000,
      discount: "-20%",
      rating: "4.8/5 (145)",
      image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&q=80",
      description: "Lòng nồi tráng men chống gỉ, bảng điều khiển tiếng Việt thông minh.",
    }
  ];

  // 3. Nồi chiên không dầu
  const airFryerProducts = [
    {
      id: "af-1",
      brand: "Philips",
      name: "Philips Nồi Chiên Không Dầu HD9252/90 4.1 Lít",
      price: 2190000,
      originalPrice: 2990000,
      discount: "-27%",
      rating: "4.9/5 (340)",
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80",
      description: "Công nghệ Rapid Air giảm 90% lượng chất béo, màn hình cảm ứng 7 chế độ cài sẵn.",
    },
    {
      id: "af-2",
      brand: "LocknLock",
      name: "LocknLock Nồi Chiên Không Dầu Điện Tử EJF284BLK 5.5 Lít",
      price: 1650000,
      originalPrice: 2390000,
      discount: "-31%",
      rating: "4.8/5 (280)",
      image: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=500&q=80",
      description: "Dung tích lớn 5.5L quay nguyên con gà, lòng nồi chống dính Teflon cao cấp.",
    }
  ];

  // 4. Robot hút bụi
  const robotProducts = [
    {
      id: "rb-1",
      brand: "Ecovacs",
      name: "Ecovacs Deebot N30 | Robot hút bụi lau nhà 10.000Pa",
      price: 1790000,
      originalPrice: 2090000,
      discount: "-14%",
      rating: "5.0/5 (120)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5a4j60cb",
      description: "Lực hút 10.000Pa cực mạnh, chổi chống rối ZeroTangle 2.0, pin 5200mAh.",
    }
  ];

  // 5. Nồi cơm điện
  const riceCookerProducts = [
    {
      id: "rc-5",
      brand: "LocknLock",
      name: "LocknLock Daily rice cooker EJR472BLK 1.8L",
      price: 1790000,
      originalPrice: 2090000,
      discount: "-14%",
      rating: "4.9/5 (512)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8c60r9c267",
      description: "Gia nhiệt đều giúp cơm chín ngon tròn vị.",
    }
  ];

  // 6. Đèn bàn thông minh
  const lampProducts = [
    {
      id: "lp-1",
      brand: "Xiaomi",
      name: "Xiaomi Mi Smart LED Desk Lamp 1S | Chống cận thị",
      price: 590000,
      originalPrice: 750000,
      discount: "-21%",
      rating: "4.9/5 (88)",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
      description: "4 chế độ chiếu sáng bảo vệ mắt, kết nối App điều khiển từ xa.",
    }
  ];

  // 7. Kệ tủ đồ đa năng
  const shelfProducts = [
    {
      id: "sf-1",
      brand: "HomeDecor",
      name: "Kệ Gỗ Nhiều Tầng Đa Năng Cho Phòng Khách & Bếp",
      price: 790000,
      originalPrice: 950000,
      discount: "-17%",
      rating: "4.8/5 (64)",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80",
      description: "Chất liệu gỗ MDF phủ Melamine chống nước, thiết kế hiện đại.",
    }
  ];

  // Danh mục hiển thị ở Trang chủ
  const categoriesHome = [
    {
      id: "cookware",
      name: "Nồi & Chảo Inox",
      description: "Bộ nồi inox 3 đáy, chảo chống dính dùng cho mọi loại bếp...",
      image: cookwareProducts[0].image,
      data: cookwareProducts,
    },
    {
      id: "microwave",
      name: "Lò vi sóng",
      description: "Hâm nóng, rã đông, tích hợp nướng Sharp, Toshiba, Panasonic...",
      image: microwaveProducts[0].image,
      data: microwaveProducts,
    },
    {
      id: "air-fryer",
      name: "Nồi chiên không dầu",
      description: "Chiên giòn giảm 90% mỡ thừa Philips, LocknLock, BlueStone...",
      image: airFryerProducts[0].image,
      data: airFryerProducts,
    },
    {
      id: "rice-cooker",
      name: "Nồi cơm điện",
      description: "Đa dạng các dòng nồi Panasonic, Toshiba, Sunhouse, LocknLock...",
      image: riceCookerProducts[0].image,
      data: riceCookerProducts,
    },
    {
      id: "robot",
      name: "Robot hút bụi",
      description: "Tự động hút bụi, lau nhà thông minh, lập bản đồ Laser...",
      image: robotProducts[0].image,
      data: robotProducts,
    },
    {
      id: "lamp",
      name: "Đèn bàn thông minh",
      description: "Bảo vệ mắt chống cận thị, điều chỉnh độ sáng cảm ứng...",
      image: lampProducts[0].image,
      data: lampProducts,
    },
    {
      id: "shelf",
      name: "Kệ để đồ đa năng",
      description: "Kệ gỗ, kệ sắt nhiều tầng giúp sắp xếp nhà cửa gọn gàng...",
      image: shelfProducts[0].image,
      data: shelfProducts,
    },
  ];

  // Xử lý chuyển trang
  const handleOpenCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView("category");
  };

  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    setQuantity(1);
    setCurrentView("detail");
  };

  const getActiveCategoryData = () => {
    return categoriesHome.find((c) => c.id === selectedCategory) || categoriesHome[0];
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
          <nav className="hidden md:flex space-x-4 text-gray-700 font-medium text-xs lg:text-sm">
            <button onClick={() => setCurrentView("home")} className="hover:text-blue-600">Trang chủ</button>
            <button onClick={() => handleOpenCategory("cookware")} className="hover:text-blue-600 text-red-600 font-bold">Nồi & Chảo Inox</button>
            <button onClick={() => handleOpenCategory("microwave")} className="hover:text-blue-600">Lò vi sóng</button>
            <button onClick={() => handleOpenCategory("air-fryer")} className="hover:text-blue-600">Nồi chiên</button>
            <button onClick={() => handleOpenCategory("rice-cooker")} className="hover:text-blue-600">Nồi cơm điện</button>
            <button onClick={() => handleOpenCategory("robot")} className="hover:text-blue-600">Robot hút bụi</button>
            <button onClick={() => handleOpenCategory("lamp")} className="hover:text-blue-600">Đèn bàn</button>
            <button onClick={() => handleOpenCategory("shelf")} className="hover:text-blue-600">Kệ tủ đồ</button>
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

        {/* 1. TRANG DANH MỤC SẢN PHẨM */}
        {currentView === "category" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span onClick={() => setCurrentView("home")} className="cursor-pointer hover:underline">Trang chủ</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-semibold">Danh mục {getActiveCategoryData().name}</span>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-3">
                🍳 Tất cả {getActiveCategoryData().name}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {getActiveCategoryData().data.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenDetail(item)}
                    className="border rounded-xl bg-white p-3 flex flex-col justify-between hover:shadow-lg transition cursor-pointer group"
                  >
                    <div>
                      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 flex items-center justify-center p-2">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition duration-300" 
                        />
                      </div>

                      <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 min-h-[32px]">
                        <span className="font-bold text-blue-700">{item.brand}</span> {item.name.replace(item.brand, "")}
                      </h3>

                      <div className="mt-3">
                        <div className="text-[11px] text-blue-600 font-medium">Gợi ý giảm thêm qua hotline</div>
                        <div className="text-base font-bold text-red-600 mt-0.5">
                          {item.price.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <span className="line-through">{item.originalPrice.toLocaleString("vi-VN")}đ</span>
                          <span className="text-blue-600 font-bold">{item.discount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t text-[11px] text-gray-500 space-y-1">
                      <div className="text-blue-600 flex items-center gap-1 font-medium">
                        👍 Hoàn tiền nếu siêu thị khác Rẻ hơn
                      </div>
                      <div className="flex justify-between items-center">
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
        {currentView === "detail" && selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span onClick={() => setCurrentView("home")} className="cursor-pointer hover:underline">Trang chủ</span>
              <span>&gt;</span>
              <span onClick={() => setCurrentView("category")} className="cursor-pointer hover:underline">
                {getActiveCategoryData().name}
              </span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 border flex items-center justify-center p-4">
                  <img src={selectedImage} alt={selectedProduct.name} className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">
                    {selectedProduct.name}
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
                  <button onClick={addToCart} className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                    🛒 Thêm Vào Giỏ Hàng
                  </button>
                  <button onClick={addToCart} className="bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition">
                    🛍️ Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TRANG CHỦ DANH SÁCH DANH MỤC SẢN PHẨM */}
        {currentView === "home" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categoriesHome.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between hover:shadow-md transition cursor-pointer group"
                  onClick={() => handleOpenCategory(category.id)}
                >
                  <div>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-50 mb-3">
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        DANH MỤC
                      </span>
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{category.description}</p>
                  </div>

                  <div>
                    <div className="text-red-600 font-bold text-sm mb-3">
                      Xem danh sách ({category.data.length} sản phẩm)
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCategory(category.id);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Xem tất cả
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
