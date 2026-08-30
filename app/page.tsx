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

  // 1. Máy sấy tóc (10 sản phẩm)
  const hairDryerProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `hd-${i + 1}`,
    brand: ["Dyson", "Panasonic", "Philips", "Flyco", "Xiaomi"][i % 5],
    name: `Máy Sấy Tóc Tạo Kiểu Chăm Sóc Tóc HD-${i + 1}`,
    price: 290000 + i * 150000,
    originalPrice: 450000 + i * 200000,
    discount: `-${20 + (i % 10)}%`,
    rating: "4.9/5 (180)",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
    description: "Công suất mạnh mẽ, bổ sung ion âm bảo vệ tóc không bị khô xơ, nhiều chế độ sấy nóng/lạnh linh hoạt.",
  }));

  // 2. Bàn chải đánh răng điện (10 sản phẩm)
  const toothbrushProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `tb-${i + 1}`,
    brand: ["Oral-B", "Philips Sonicare", "USmile", "Halio", "Xiaomi"][i % 5],
    name: `Bàn Chải Đánh Răng Điện Sóng Âm TB-${i + 1}`,
    price: 350000 + i * 120000,
    originalPrice: 500000 + i * 160000,
    discount: `-${25 + (i % 8)}%`,
    rating: "4.8/5 (210)",
    image: "https://images.unsplash.com/photo-1559591937-e68fb3305e40?w=500&q=80",
    description: "Tần số rung siêu âm làm sạch sâu mảng bám, chế độ hẹn giờ thông minh 2 phút, chống nước IPX7.",
  }));

  // 3. Máy tăm nước (10 sản phẩm)
  const flosserProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `wf-${i + 1}`,
    brand: ["Waterpik", "Panasonic", "Procare", "Halio", "Xiaomi"][i % 5],
    name: `Máy Tăm Nước Cầm Tay Vệ Sinh Răng Miệng WF-${i + 1}`,
    price: 550000 + i * 180000,
    originalPrice: 800000 + i * 220000,
    discount: `-${22 + (i % 12)}%`,
    rating: "4.9/5 (165)",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80",
    description: "Áp lực nước siêu mạnh vệ sinh sạch kẽ răng và mắc cài niềng răng, dung tích bình chứa lớn tiện lợi.",
  }));

  // 4. Quạt điện các loại (10 sản phẩm)
  const fanProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `fn-${i + 1}`,
    brand: ["Panasonic", "Senko", "Toshiba", "Xiaomi", "Dyson"][i % 5],
    name: `Quạt Điện Đứng / Quạt Không Cánh FN-${i + 1}`,
    price: 420000 + i * 190000,
    originalPrice: 600000 + i * 250000,
    discount: `-${18 + (i % 10)}%`,
    rating: "4.8/5 (310)",
    image: "https://images.unsplash.com/photo-1618941723616-9584d47c34d3?w=500&q=80",
    description: "Động cơ DC inverter tiết kiệm điện, vận hành êm ái, nhiều tốc độ gió và có điều khiển từ xa.",
  }));

  // 5. Máy lọc không khí (10 sản phẩm)
  const purifierProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `ap-${i + 1}`,
    brand: ["Xiaomi", "Sharp", "Dyson", "Philips", "Samsung"][i % 5],
    name: `Máy Lọc Không Khí Diệt Khuẩn AP-${i + 1}`,
    price: 1800000 + i * 350000,
    originalPrice: 2500000 + i * 400000,
    discount: `-${20 + (i % 15)}%`,
    rating: "5.0/5 (140)",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    description: "Màng lọc HEPA diệt khuẩn khử mùi, lọc sạch bụi mịn PM2.5, kết nối ứng dụng điện thoại thông minh.",
  }));

  // 6. Máy hút ẩm (10 sản phẩm)
  const dehumidifierProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `dh-${i + 1}`,
    brand: ["Dorosin", "Kosmen", "Sharp", "Electrolux", "FujiE"][i % 5],
    name: `Máy Hút Ẩm Chống Mốc Gia Đình DH-${i + 1}`,
    price: 2500000 + i * 400000,
    originalPrice: 3200000 + i * 500000,
    discount: `-${15 + (i % 10)}%`,
    rating: "4.9/5 (95)",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80",
    description: "Hút ẩm nhanh chóng bảo vệ đồ gỗ và sức khỏe, dung tích lọc lớn, tích hợp chức năng sấy quần áo.",
  }));

  // 7. Máy tạo kiểu tóc (10 sản phẩm)
  const stylerProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `st-${i + 1}`,
    brand: ["Dyson", "Philips", "Flyco", "Vivid & Vogue", "Tesco"][i % 5],
    name: `Máy Uốn Lọn / Là Thẳng Tóc Đa Năng ST-${i + 1}`,
    price: 280000 + i * 160000,
    originalPrice: 400000 + i * 220000,
    discount: `-${25 + (i % 10)}%`,
    rating: "4.8/5 (175)",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
    description: "Mặt gốm phay mịn phủ gốm Keratin dưỡng tóc, gia nhiệt nhanh trong 30 giây, tạo kiểu tóc giữ nếp cả ngày.",
  }));

  // 8. Máy xông tinh dầu (10 sản phẩm)
  const diffuserProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `df-${i + 1}`,
    brand: ["Haeva", "Kodo", "Xiaomi", "LocknLock", "Bear"][i % 5],
    name: `Máy Phun Sương Khuếch Tán Tinh Dầu DF-${i + 1}`,
    price: 190000 + i * 80000,
    originalPrice: 300000 + i * 110000,
    discount: `-${30 + (i % 10)}%`,
    rating: "4.9/5 (220)",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
    description: "Công nghệ siêu âm tạo sương mịn, kết hợp đèn LED đổi màu sinh động, giúp thư giãn không gian phòng.",
  }));

  // 9. Dao kéo các loại
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

  // 10. Bếp từ nấu lẩu
  const inductionProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `ic-${i + 1}`,
    brand: ["Sunhouse", "Kangaroo", "Midea", "Philips", "BlueStone"][i % 5],
    name: `Bếp Từ Đơn Nấu Lẩu & Nấu Ăn Cảm Ứng IC-${i + 1}`,
    price: 650000 + i * 120000,
    originalPrice: 950000 + i * 150000,
    discount: `-${20 + (i % 12)}%`,
    rating: "4.8/5 (230)",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80",
    description: "Mặt kính chịu nhiệt chịu lực tốt, công suất 2000W đun nấu siêu nhanh, nhiều chế độ nấu tiện lợi.",
  }));

  // 11. Nồi & Chảo Inox
  const cookwareProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `cw-${i + 1}`,
    brand: ["Sunhouse", "Elmich", "Fissler", "Goldsun", "Kangaroo"][i % 5],
    name: `Nồi / Chảo Inox Cao Cấp Mẫu ${i + 1}`,
    price: 350000 + i * 120000,
    originalPrice: 500000 + i * 150000,
    discount: `-${15 + (i % 20)}%`,
    rating: "4.8/5 (120)",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&q=80",
    description: "Chất liệu Inox cao cấp chống gỉ, truyền nhiệt nhanh, đáy 3 lớp dùng tốt trên mọi loại bếp.",
  }));

  // 12. Lò vi sóng
  const microwaveProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `mw-${i + 1}`,
    brand: ["Sharp", "Toshiba", "Panasonic", "Electrolux", "Samsung"][i % 5],
    name: `Lò Vi Sóng Điện Tử / Cơ Model MS-${i + 1}`,
    price: 1200000 + i * 180000,
    originalPrice: 1600000 + i * 200000,
    discount: `-${18 + (i % 12)}%`,
    rating: "4.9/5 (95)",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80",
    description: "Dung tích lớn, tích hợp chức năng rã đông nhanh, hâm nóng đồng đều và chế độ nướng tiện lợi.",
  }));

  // 13. Nồi chiên không dầu
  const airFryerProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `af-${i + 1}`,
    brand: ["Philips", "LocknLock", "BlueStone", "Sunhouse", "Magic"][i % 5],
    name: `Nồi Chiên Không Dầu AF-${i + 1}`,
    price: 1100000 + i * 150000,
    originalPrice: 1500000 + i * 180000,
    discount: `-${20 + (i % 15)}%`,
    rating: "4.8/5 (210)",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80",
    description: "Công nghệ chiên đối lưu Rapid Air giảm 90% mỡ thừa, lòng nồi phủ chống dính cao cấp.",
  }));

  // 14. Nồi cơm điện
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

  // 15. Robot hút bụi
  const robotProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `rb-${i + 1}`,
    brand: ["Ecovacs", "Xiaomi", "Dreame", "Roborock", "Neato"][i % 5],
    name: `Robot Hút Bụi Lau Nhà RB-${i + 1}`,
    price: 3200000 + i * 450000,
    originalPrice: 4500000 + i * 500000,
    discount: `-${22 + (i % 10)}%`,
    rating: "5.0/5 (150)",
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5a4j60cb",
    description: "Lực hút siêu mạnh, định vị Laser lập bản đồ nhà thông minh, tự động sạc điện khi hết pin.",
  }));

  // 16. Đèn bàn thông minh
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

  // 17. Kệ tủ đồ đa năng
  const shelfProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `sf-${i + 1}`,
    brand: ["HomeDecor", "IBIE", "Baya", "Đại Đồng Tiến", "Song Long"][i % 5],
    name: `Kệ Để Đồ Đa Năng KS-${i + 1}`,
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
      id: "hair-dryer",
      name: "Máy sấy tóc",
      description: "Máy sấy tóc ion âm bảo vệ tóc Dyson, Panasonic, Philips, Flyco...",
      image: hairDryerProducts[0].image,
      data: hairDryerProducts,
    },
    {
      id: "electric-toothbrush",
      name: "Bàn chải điện",
      description: "Bàn chải đánh răng điện sóng âm làm sạch mảng bám Oral-B, Philips...",
      image: toothbrushProducts[0].image,
      data: toothbrushProducts,
    },
    {
      id: "water-flosser",
      name: "Máy tăm nước",
      description: "Máy tăm nước cầm tay làm sạch kẽ răng Waterpik, Panasonic, Halio...",
      image: flosserProducts[0].image,
      data: flosserProducts,
    },
    {
      id: "fan",
      name: "Quạt điện các loại",
      description: "Quạt đứng, quạt cây, quạt không cánh êm ái Panasonic, Toshiba, Xiaomi...",
      image: fanProducts[0].image,
      data: fanProducts,
    },
    {
      id: "air-purifier",
      name: "Máy lọc không khí",
      description: "Lọc bụi mịn PM2.5, diệt khuẩn khử mùi phòng ngủ Xiaomi, Sharp, Dyson...",
      image: purifierProducts[0].image,
      data: purifierProducts,
    },
    {
      id: "dehumidifier",
      name: "Máy hút ẩm",
      description: "Hút ẩm chống nấm mốc mùa nồm Dorosin, Kosmen, Sharp, FujiE...",
      image: dehumidifierProducts[0].image,
      data: dehumidifierProducts,
    },
    {
      id: "hair-styler",
      name: "Máy tạo kiểu tóc",
      description: "Máy uốn tóc xoăn, máy là thẳng tóc phủ Keratin Dyson, Vivid & Vogue...",
      image: stylerProducts[0].image,
      data: stylerProducts,
    },
    {
      id: "essential-diffuser",
      name: "Máy xông tinh dầu",
      description: "Máy phun sương khuếch tán tinh dầu thư giãn Haeva, Kodo, Xiaomi...",
      image: diffuserProducts[0].image,
      data: diffuserProducts,
    },
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
          <nav className="hidden md:flex space-x-3 text-gray-700 font-medium text-xs lg:text-sm overflow-x-auto py-2">
            <button onClick={() => setCurrentView("home")} className="hover:text-blue-600 whitespace-nowrap">Trang chủ</button>
            <button onClick={() => handleOpenCategory("hair-dryer")} className="hover:text-blue-600 whitespace-nowrap text-blue-700 font-bold">Máy sấy tóc</button>
            <button onClick={() => handleOpenCategory("electric-toothbrush")} className="hover:text-blue-600 whitespace-nowrap text-blue-700 font-bold">Bàn chải điện</button>
            <button onClick={() => handleOpenCategory("water-flosser")} className="hover:text-blue-600 whitespace-nowrap text-blue-700 font-bold">Máy tăm nước</button>
            <button onClick={() => handleOpenCategory("fan")} className="hover:text-blue-600 whitespace-nowrap text-blue-700 font-bold">Quạt điện</button>
            <button onClick={() => handleOpenCategory("air-purifier")} className="hover:text-blue-600 whitespace-nowrap text-blue-700 font-bold">Máy lọc khí</button>
            <button onClick={() => handleOpenCategory("dehumidifier")} className="hover:text-blue-600 whitespace-nowrap">Máy hút ẩm</button>
            <button onClick={() => handleOpenCategory("hair-styler")} className="hover:text-blue-600 whitespace-nowrap">Tạo kiểu tóc</button>
            <button onClick={() => handleOpenCategory("essential-diffuser")} className="hover:text-blue-600 whitespace-nowrap">Xông tinh dầu</button>
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
