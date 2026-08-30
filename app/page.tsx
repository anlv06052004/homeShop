"use client";

import React, { useState } from "react";

export default function HomeShop() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cartCount, setCartCount] = useState<number>(0);

  // Bộ ảnh thực tế của Ecovacs Deebot N30
  const robotImages = [
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5a4j60cb",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5b0u843c",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5b28sk8c",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5e6m80c8",
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmqu2t5e57nk97",
  ];

  const products = [
    {
      id: "1",
      name: "Nồi cơm điện",
      price: 1790000,
      originalPrice: 2090000,
      image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&q=80",
      description: "Công nghệ cao tần giúp cơm chín đều và thơm ngon.",
    },
    {
      id: "2",
      name: "Robot hút bụi",
      fullName: "[Chính Hãng] Ecovacs Deebot N30 | Robot hút bụi lau nhà | Lực hút 10.000Pa",
      price: 1790000,
      originalPrice: 2090000,
      image: robotImages[0],
      images: robotImages,
      description: "Tự động hút bụi, lau nhà và quay về trạm sạc.",
      highlights: [
        "Công nghệ ZeroTangle 2.0 – Chổi cuộn & lược gỡ tóc chữ V, chống rối 99.8%.",
        "Lực hút cực mạnh 10.000Pa – Làm sạch sâu bụi mịn, mảnh vụn và thảm.",
        "TrueMapping thông minh – Lập bản đồ 100m² trong 8 phút, lưu 3+1 bản đồ.",
        "Điều hướng linh hoạt – Vượt rào 20mm, nâng giẻ lau 9mm khi gặp thảm.",
        "Pin 5200mAh – Làm sạch diện tích lớn liên tục trong 1 lần sạc.",
        "Ứng dụng ECOVACS HOME – Tùy chỉnh lực hút, lượng nước và lịch làm việc.",
      ],
      specs: [
        { label: "Tên sản phẩm", value: "Robot hút bụi lau nhà Ecovacs Deebot N30" },
        { label: "Model", value: "N30" },
        { label: "Màu sắc", value: "Trắng / Đen" },
        { label: "Lực hút tối đa", value: "10.000Pa" },
        { label: "Công nghệ chống rối", value: "ZeroTangle 2.0 (chổi cuộn chữ V, lược gỡ tóc/lông tự động)" },
        { label: "Công nghệ hút bụi", value: "PureCyclone (duy trì lực hút ổn định)" },
        { label: "Dung lượng pin", value: "5200mAh (pin Li-ion)" },
        { label: "Thời gian sạc", value: "~6.5 giờ" },
        { label: "Độ ồn", value: "Hút bụi ~65dB | Lau nhà ~83dB | Hút + Lau ~60dB" },
        { label: "Điều hướng & bản đồ", value: "TrueMapping (100m² / 8 phút), lưu 3+1 bản đồ" },
        { label: "Khả năng vượt rào", value: "20mm" },
        { label: "Khả năng nâng giẻ lau", value: "9mm" },
        { label: "Dung tích hộp bụi", value: "350ml" },
        { label: "Công nghệ lau cạnh", value: "TruEdge (sát mép tường)" },
        { label: "Kích thước robot", value: "353 × 353 × 104 mm" },
        { label: "Thương hiệu", value: "ECOVACS" },
      ],
      commitments: [
        "Hàng Nhập khẩu chính ngạch, mới 100%, nguyên tem NSX.",
        "Đảm bảo kiểm tra sản phẩm kỹ càng trước khi giao đến tay khách hàng.",
        "Tư vấn nhiệt tình, chu đáo, luôn lắng nghe khách hàng.",
        "Cam kết giá tốt nhất thị trường.",
      ]
    },
    {
      id: "3",
      name: "Đèn bàn thông minh",
      price: 590000,
      originalPrice: 750000,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
      description: "Điều chỉnh độ sáng, bảo vệ mắt khi học tập.",
    },
    {
      id: "4",
      name: "Kệ để đồ đa năng",
      price: 790000,
      originalPrice: 950000,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80",
      description: "Kệ nhiều tầng phù hợp phòng bếp và phòng khách.",
    },
  ];

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(product.images ? product.images[0] : product.image);
    setQuantity(1);
  };

  const addToCart = () => {
    setCartCount((prev) => prev + quantity);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      {/* Header Navigation */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 
            onClick={() => setSelectedProduct(null)} 
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            HomeShop
          </h1>
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <button onClick={() => setSelectedProduct(null)} className="hover:text-blue-600">Trang chủ</button>
            <a href="#" className="hover:text-blue-600">Sản phẩm</a>
            <a href="#" className="hover:text-blue-600">Khuyến mãi</a>
            <a href="#" className="hover:text-blue-600">Liên hệ</a>
          </nav>
          <div className="relative">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
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

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {selectedProduct ? (
          <div className="space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span onClick={() => setSelectedProduct(null)} className="cursor-pointer hover:underline">HomeShop</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
            </div>

            {/* Product Detail Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Image Gallery */}
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 border">
                  <img
                    src={selectedImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
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

              {/* Right Column: Overview */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                    {selectedProduct.fullName || selectedProduct.name}
                  </h2>

                  <div className="flex items-center gap-3 my-4">
                    <span className="text-3xl font-bold text-red-600">
                      {selectedProduct.price.toLocaleString("vi-VN")} đ
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {selectedProduct.originalPrice.toLocaleString("vi-VN")} đ
                    </span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      SALE
                    </span>
                  </div>

                  {selectedProduct.highlights && (
                    <div className="my-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-2 text-sm">Đặc điểm nổi bật:</h4>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {selectedProduct.highlights.map((feat: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-4 py-4 border-t border-b text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 w-24">Voucher:</span>
                      <select className="border rounded-md px-3 py-1.5 bg-gray-50">
                        <option>Mã Giảm Giá Shop (Giảm 4%)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 w-24">Vận chuyển:</span>
                      <span className="text-gray-800">Miễn phí vận chuyển (Phí ship 0đ)</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 w-24">Số Lượng:</span>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 border-r hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 border-l hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={addToCart}
                    className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2"
                  >
                    🛒 Thêm Vào Giỏ Hàng
                  </button>
                  <button
                    onClick={addToCart}
                    className="bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 flex justify-center items-center gap-2"
                  >
                    🛍️ Mua Ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Specifications & Commitments */}
            {selectedProduct.specs && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Specifications Table */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b flex items-center gap-2">
                    📋 Thông Số Kỹ Thuật
                  </h3>
                  <div className="divide-y text-sm">
                    {selectedProduct.specs.map((item: any, idx: number) => (
                      <div key={idx} className="py-2.5 grid grid-cols-3 gap-4">
                        <span className="text-gray-500 font-medium">{item.label}</span>
                        <span className="col-span-2 text-gray-800 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commitments & Guarantee */}
                <div className="bg-white rounded-xl p-6 shadow-sm border h-fit space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b flex items-center gap-2">
                      🛡️ Cam Kết Từ Shop
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {selectedProduct.commitments.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✅</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-xs text-gray-700 space-y-2">
                    <p className="font-bold text-orange-800">⭐️ Ecovacs Việt Nam xin cảm ơn!</p>
                    <p>Nếu bạn cần hỗ trợ thêm, đừng ngần ngại nhắn tin qua kênh chat chăm sóc khách hàng nhé!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* HOMEPAGE PRODUCT LIST */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between hover:shadow-md transition cursor-pointer"
                  onClick={() => handleOpenProduct(p)}
                >
                  <div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        SALE
                      </span>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-red-600 font-bold">{p.price.toLocaleString("vi-VN")} đ</span>
                      <span className="text-gray-400 text-xs line-through">{p.originalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart();
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Thêm vào giỏ
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
