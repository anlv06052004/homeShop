"use client";

import React, { useState } from "react";

export default function HomeShop() {
  const [currentView, setCurrentView] = useState<"home" | "category" | "detail">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // --- DỮ LIỆU SẢN PHẨM (MỖI DANH MỤC 10 SẢN PHẨM) ---

  // 1. Dao kéo các loại (10 sản phẩm)
  const knifeProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `kn-${i + 1}`,
    brand: ["Kiwi", "Zwilling", "Sunhouse", "LocknLock", "KAI"][i % 5],
    name: `Bộ Dao Kéo Nhà Bếp Thép Không Gỉ Model K-${i + 1}`,
    price: 90000 + i * 45000,
    originalPrice: 150000 + i * 60000,
    discount: `-${25 + (i % 10)}%`,
    rating: "4.9/5 (110)",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&q=80",
    description: "Lưỡi thép không gỉ sắc bén, tay cầm chống trượt đầm tay, hỗ trợ gọt hoa quả, thái thịt, chặt xương dễ dàng.",
  }));

  // 2. Bếp từ nấu lẩu / nấu ăn (10 sản phẩm)
  const inductionProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `ic-${i + 1}`,
    brand: ["Sunhouse", "Kangaroo", "Midea", "Philips", "BlueStone"][i % 5],
    name: `Bếp Từ Đơn Nấu Lẩu & Nấu Ăn Cảm Ứng IC-${i + 1}`,
    price: 650000 + i * 120000,
    originalPrice: 950000 + i * 150000,
    discount: `-${20 + (i % 12)}%`,
    rating: "4.8/5 (230)",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80",
    description: "Mặt kính chịu nhiệt chịu lực tốt, công suất 2000W đun nấu siêu nhanh, nhiều chế độ nấu lẩu, xào, rán, hầm tiện lợi.",
  }));

  // 3. Nồi & Chảo Inox (10 sản phẩm)
  const cookwareProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `cw-${i + 1}`,
    brand: ["Sunhouse", "Elmich", "Fissler", "Goldsun", "Kangaroo"][i % 5],
    name: `Nồi / Chảo Inox Cao Cấp Mẫu ${i + 1}`,
    price: 350000 + i * 120000,
    originalPrice: 500000 + i * 150000,
    discount: `-${15 + (i % 20)}%`,
    rating: "4.8/5 (120)",
    image: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&q=80",
      "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=500&q=80",
    ][i % 2],
    description: "Chất liệu Inox cao cấp chống gỉ, truyền nhiệt nhanh, đáy 3 lớp dùng tốt trên mọi loại bếp kể cả bếp từ.",
  }));

  // 4. Lò vi sóng (10 sản phẩm)
  const microwaveProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `mw-${i + 1}`,
    brand: ["Sharp", "Toshiba", "Panasonic", "Electrolux", "Samsung"][i % 5],
    name: `Lò Vi Sóng Điện Tử / Cơ Model MS-${i + 1}`,
    price: 1200000 + i * 180000,
    originalPrice: 1600000 + i * 200000,
    discount: `-${18 + (i % 12)}%`,
    rating: "4.9/5 (95)",
    image: [
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80",
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&q=80",
    ][i % 2],
    description: "Dung tích lớn, tích hợp chức năng rã đông nhanh, hâm nóng đồng đều và chế độ nướng tiện lợi.",
  }));

  // 5. Nồi chiên không dầu (10 sản phẩm)
  const airFryerProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `af-${i + 1}`,
    brand: ["Philips", "LocknLock", "BlueStone", "Sunhouse", "Magic"][i % 5],
    name: `Nồi Chiên Không Dầu Dung Tích Lớn AF-${i + 1}`,
    price: 1100000 + i * 150000,
    originalPrice: 1500000 + i * 180000,
    discount: `-${20 + (i % 15)}%`,
    rating: "4.8/5 (210)",
    image: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80",
      "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=500&q=80",
    ][i % 2],
    description: "Công nghệ chiên đối lưu Rapid Air giảm 90% mỡ thừa, lòng nồi phủ chống dính cao cấp dễ vệ sinh.",
  }));

  // 6. Nồi cơm điện (10 sản phẩm)
  const riceCookerProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `rc-${i + 1}`,
    brand: ["Panasonic", "Toshiba", "Cuckoo", "Sunhouse", "LocknLock"][i % 5],
    name: `Nồi Cơm Điện Cao Cấp RC-${i + 1}`,
    price: 450000 + i * 130000,
    originalPrice: 650000 + i * 160000,
    discount: `-${15 + (i % 10)}%`,
    rating: "4.9/5 (180)",
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8c60r9c267",
    description: "Gia nhiệt 3D giúp hạt cơm chín đều, dẻo ngon. Lòng nồi dày chống dính an toàn sức khỏe.",
  }));

  // 7. Robot hút bụi (10 sản phẩm)
  const robotProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `rb-${i + 1}`,
    brand: ["Ecovacs", "Xiaomi", "Dreame", "Roborock", "Neato"][i % 5],
    name: `Robot Hút Bụi Lau Nhà Thông Minh RB-${i + 1}`,
    price: 3200000 + i * 450000,
    originalPrice: 4500000 + i * 500000,
    discount: `-${22 + (i % 10)}%`,
    rating: "5.0/5 (150)",
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5a4j60cb",
    description: "Lực hút siêu mạnh, định vị Laser lập bản đồ nhà thông minh, tự động sạc điện khi hết pin.",
  }));

  // 8. Đèn bàn thông minh (10 sản phẩm)
  const lampProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `lp-${i + 1}`,
    brand: ["Xiaomi", "Philips", "Điện Quang", "Rạng Đông", "Baseus"][i % 5],
    name: `Đèn Bàn LED Chống Cận Thị DL-${i + 1}`,
    price: 250000 + i * 60000,
    originalPrice: 380000 + i * 80000,
    discount: `-${20 + (i % 10)}%`,
    rating: "4.9/5 (85)",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    description: "Ánh sáng liên tục không nhấp nháy bảo vệ mắt, nhiều chế độ sáng cảm ứng linh hoạt.",
  }));

  // 9. Kệ tủ đồ đa năng (10 sản phẩm)
  const shelfProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `sf-${i + 1}`,
    brand: ["HomeDecor", "IBIE", "Baya", "Đại Đồng Tiến", "Song Long"][i % 5],
    name: `Kệ Để Đồ Đa Năng Nhanh Gọn KS-${i + 1}`,
    price: 390000 + i * 90000,
    originalPrice: 550000 + i * 110000,
    discount: `-${25 + (i % 8)}%`,
    rating: "4.8/5 (95)",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80",
    description: "Chịu lực tốt, lắp ráp dễ dàng, chất liệu bền đẹp tối ưu không gian sống gọn gàng.",
  }));

  // Danh mục hiển thị ở Trang chủ
  const categoriesHome = [
    {
      id: "knives",
      name: "Dao kéo các loại",
      description: "Bộ dao làm bếp, kéo cắt thức ăn thép không gỉ sắc bén Kiwi, Zwilling...",
      image: knifeProducts[0].image,
      data: knifeProducts,
    },
    {
      id: "induction-cooker",
      name: "Bếp từ nấu lẩu",
      description: "Bếp từ đơn, bếp từ đôi đun nấu siêu nhanh Sunhouse, Kangaroo, Midea...",
      image: inductionProducts[0].image,
      data: inductionProducts,
    },
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
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 
            onClick={() => setCurrentView("home")} 
            className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-2"
          >
            HomeShop
          </h1>
          <nav className="hidden md:flex space-x-3 text-gray-700 font-medium text-xs lg:text-sm overflow-x-auto">
            <button onClick={() => setCurrentView("home")} className="hover:text-blue-600 whitespace-nowrap">Trang chủ</button>
            <button onClick={() => handleOpenCategory("knives")} className="hover:text-blue-600 whitespace-nowrap text-red-600 font-bold">Dao kéo</button>
            <button onClick={() => handleOpenCategory("induction-cooker")} className="hover:text-blue-600 whitespace-nowrap text-red-600 font-bold">Bếp từ</button>
            <button onClick={() => handleOpenCategory("cookware")} className="hover:text-blue-600 whitespace-nowrap">Nồi & Chảo</button>
            <button onClick={() => handleOpenCategory("microwave")} className="hover:text-blue-600 whitespace-nowrap">Lò vi sóng</button>
            <button onClick={() => handleOpenCategory("air-fryer")} className="hover:text-blue-600 whitespace-nowrap">Nồi chiên</button>
            <button onClick={() => handleOpenCategory("rice-cooker")} className="hover:text-blue-600 whitespace-nowrap">Nồi cơm</button>
            <button onClick={() => handleOpenCategory("robot")} className="hover:text-blue-600 whitespace-nowrap">Robot hút bụi</button>
            <button onClick={() => handleOpenCategory("lamp")} className="hover:text-blue-600 whitespace-nowrap">Đèn bàn</button>
            <button onClick={() => handleOpenCategory("shelf")} className="hover:text-blue-600 whitespace-nowrap">Kệ tủ đồ</button>
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
                📦 Tất cả {getActiveCategoryData().name} ({getActiveCategoryData().data.length} sản phẩm)
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

        {/* 3. TRANG CHỦ DANH SÁCH CÁC DANH MỤC */}
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
