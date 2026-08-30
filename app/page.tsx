"use client";

import React, { useState } from "react";

export default function HomeShop() {
  // State quản lý luồng màn hình: 'home' (Trang chủ) | 'category' (Xem danh mục) | 'detail' (Chi tiết 1 sản phẩm)
  const [currentView, setCurrentView] = useState<"home" | "category" | "detail">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 'rice-cooker' | 'robot' | 'lamp' | 'shelf'
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // --- DỮ LIỆU CÁC DANH MỤC SẢN PHẨM ---

  // 1. Dữ liệu Robot hút bụi
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
      images: [
        "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5a4j60cb",
        "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5b0u843c",
        "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5b28sk8c",
      ],
      description: "Lực hút 10.000Pa cực mạnh, chổi chống rối ZeroTangle 2.0, pin 5200mAh.",
    },
    {
      id: "rb-2",
      brand: "Xiaomi",
      name: "Xiaomi Vacuum Mop 2 Pro | Lau rung sóng âm",
      price: 2490000,
      originalPrice: 3200000,
      discount: "-22%",
      rating: "4.8/5 (95)",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80",
      description: "Công nghệ lau rung tần số cao, lập bản đồ laser LDS chính xác.",
    },
    {
      id: "rb-3",
      brand: "Dreame",
      name: "Dreame D9 Max | Lực hút 4000Pa - Pin 5200mAh",
      price: 2190000,
      originalPrice: 2890000,
      discount: "-24%",
      rating: "4.9/5 (150)",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&q=80",
      description: "Cảm biến LiDAR thông minh, nhận diện thảm tự động tăng lực hút.",
    },
    {
      id: "rb-4",
      brand: "Roborock",
      name: "Roborock Q7 Max | Hộp rác siêu lớn 470ml",
      price: 3100000,
      originalPrice: 3900000,
      discount: "-20%",
      rating: "4.9/5 (210)",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80",
      description: "Hệ thống cuộn cao su chống rối tóc, khóa trẻ em an toàn.",
    }
  ];

  // 2. Dữ liệu Nồi cơm điện
  const riceCookerProducts = [
    {
      id: "rc-1",
      brand: "Perfect",
      name: "Perfect Nồi Cơm Điện PF-C105 1.2 Lít",
      price: 199000,
      originalPrice: 499000,
      discount: "-60%",
      rating: "5/5 (29)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnp6n25t263n89",
      description: "Dung tích 1.2L, công suất 500W, lòng nồi chống dính.",
    },
    {
      id: "rc-2",
      brand: "Panasonic",
      name: "Panasonic Nồi Cơm Điện SR-MVN18LRAX 1.8 Lít",
      price: 1210000,
      originalPrice: 1500000,
      discount: "-20%",
      rating: "4.9/5 (138)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lq4f02o7q0vzf1",
      description: "Dung tích 1.8L phù hợp 4-6 người, 2 chế độ nấu tự động.",
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
      description: "Lòng nồi hợp kim nhôm chống dính siêu bền.",
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
      description: "Nồi cơm điện nắp gài Toshiba giữ ấm lâu lên tới 12 giờ.",
    },
    {
      id: "rc-5",
      brand: "LocknLock",
      name: "LocknLock Daily rice cooker EJR472BLK 1.8L",
      price: 1790000,
      originalPrice: 2090000,
      discount: "-14%",
      rating: "4.9/5 (512)",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8c60r9c267",
      images: [
        "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8c60r9c267",
        "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8fpvdez1fb",
        "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpdc8jx0dl3j41",
      ],
      description: "Gia nhiệt đều giúp cơm chín ngon tròn vị.",
    }
  ];

  // 3. Dữ liệu Đèn bàn thông minh
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
    },
    {
      id: "lp-2",
      brand: "Philips",
      name: "Philips LED Cảm Ứng Đổi Màu 3 Cấp Độ",
      price: 420000,
      originalPrice: 550000,
      discount: "-23%",
      rating: "4.8/5 (110)",
      image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500&q=80",
      description: "Ánh sáng dịu nhẹ không nhấp nháy, có cổng sạc USB tiện lợi.",
    },
    {
      id: "lp-3",
      brand: "Baseus",
      name: "Baseus Đèn Treo Màn Hình Máy Tính Chống Mỏi Mắt",
      price: 390000,
      originalPrice: 490000,
      discount: "-20%",
      rating: "5.0/5 (320)",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80",
      description: "Gắn trực tiếp màn hình, tiết kiệm diện tích bàn làm việc.",
    }
  ];

  // 4. Dữ liệu Kệ tủ đồ đa năng
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
    },
    {
      id: "sf-2",
      brand: "IKEA",
      name: "Kệ Sắt Khung Thép 4 Tầng Có Bánh Xe Di Động",
      price: 350000,
      originalPrice: 480000,
      discount: "-27%",
      rating: "4.9/5 (190)",
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&q=80",
      description: "Khung thép sơn tĩnh điện chịu lực cao, di chuyển nhẹ nhàng.",
    },
    {
      id: "sf-3",
      brand: "Bếp Sạch",
      name: "Kệ Để Lò Vi Sóng & Gia Vị Khung Sắt Chịu Lực 100kg",
      price: 490000,
      originalPrice: 650000,
      discount: "-24%",
      rating: "4.7/5 (142)",
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c5172?w=500&q=80",
      description: "Tối ưu không gian gian bếp gọn gàng, sạch đẹp.",
    }
  ];

  // Danh mục hiển thị ngoài Trang chủ
  const categoriesHome = [
    {
      id: "robot",
      name: "Robot hút bụi",
      description: "Tự động hút bụi, lau nhà thông minh, lập bản đồ Laser...",
      image: robotProducts[0].image,
      data: robotProducts,
    },
    {
      id: "rice-cooker",
      name: "Nồi cơm điện",
      description: "Đa dạng các dòng nồi Panasonic, Toshiba, Sunhouse, LocknLock...",
      image: riceCookerProducts[4].image,
      data: riceCookerProducts,
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

  // Hàm chọn danh mục
  const handleOpenCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView("category");
  };

  // Hàm xem chi tiết 1 sản phẩm
  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(product.images ? product.images[0] : product.image);
    setQuantity(1);
    setCurrentView("detail");
  };

  // Lấy dữ liệu sản phẩm thuộc danh mục đang chọn
  const getActiveCategoryData = () => {
    const found = categoriesHome.find((c) => c.id === selectedCategory);
    return found || categoriesHome[0];
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
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium text-sm">
            <button onClick={() => setCurrentView("home")} className="hover:text-blue-600">Trang chủ</button>
            <button onClick={() => handleOpenCategory("robot")} className="hover:text-blue-600">Robot hút bụi</button>
            <button onClick={() => handleOpenCategory("rice-cooker")} className="hover:text-blue-600">Nồi cơm điện</button>
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

        {/* 1. TRANG DANH MỤC SẢN PHẨM (XUẤT HIỆN KHI BẤM VÀO BẤT KỲ Ô NÀO) */}
        {currentView === "category" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span onClick={() => setCurrentView("home")} className="cursor-pointer hover:underline">Trang chủ</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-semibold">Danh mục {getActiveCategoryData().name}</span>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-3">
                📦 Tất cả {getActiveCategoryData().name}
              </h2>

              {/* Grid các sản phẩm trong danh mục */}
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

        {/* 3. TRANG CHỦ BAN ĐẦU (DANH SÁCH 4 DANH MỤC LỚN) */}
        {currentView === "home" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {categoriesHome.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between hover:shadow-md transition cursor-pointer group"
                  onClick={() => handleOpenCategory(category.id)}
                >
                  <div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
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
