"use client";

import { useState } from "react";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("160x200x25 cm");

  const images = [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4 md:px-12">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-4 max-w-6xl mx-auto">
        Trang chủ / Shop / Đệm cao su / Đệm cao su Dunlopillo
      </div>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Khối bên trái: Ảnh sản phẩm (Cột 5) */}
        <div className="lg:col-span-5">
          <div className="relative border rounded-lg overflow-hidden bg-gray-50 aspect-square">
            <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-xs px-2 py-1 z-10">
              -20%
            </span>
            <img 
              src={images[selectedImage]} 
              alt="Ảnh đệm" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 border-2 rounded overflow-hidden ${selectedImage === idx ? 'border-blue-600' : 'border-gray-200'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Khối giữa: Thông tin & Quà tặng (Cột 4) */}
        <div className="lg:col-span-4 space-y-4">
          <h1 className="text-xl font-bold text-gray-800">
            Đệm cao su Dunlopillo Latex Word Eco
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-xs text-gray-400 line-through">Giá 50.061.000đ</span>
            <span className="text-xl font-bold text-red-600">Giá 40.048.800đ</span>
          </div>

          {/* Danh sách quà tặng */}
          <div className="space-y-2 text-xs text-gray-700 bg-purple-50 p-3 rounded-md">
            <p className="flex items-center gap-1.5 font-medium"><span className="text-purple-600">☑</span> Tặng ga chun + vỏ gối 100% vải cotton</p>
            <p className="flex items-center gap-1.5 font-medium"><span className="text-purple-600">☑</span> Tặng kèm 2 ruột gối lông vũ</p>
            <p className="flex items-center gap-1.5 font-medium"><span className="text-purple-600">☑</span> Tặng kèm 1 chăn đông (vỏ lồng ruột)</p>
            <p className="flex items-center gap-1.5 font-medium"><span className="text-purple-600">☑</span> Tặng tấm bảo vệ đệm chần bông khách sạn</p>
          </div>

          {/* Chọn kích thước */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">KÍCH THƯỚC ĐỆM</label>
            <select 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border rounded p-2 text-xs text-gray-700 bg-white"
            >
              <option value="160x200x25 cm">160x200x25 cm</option>
              <option value="180x200x25 cm">180x200x25 cm</option>
              <option value="200x220x25 cm">200x220x25 cm</option>
            </select>
          </div>

          {/* Khung gọi tư vấn */}
          <div className="bg-gray-100 p-3 rounded-lg space-y-2">
            <p className="text-xs font-semibold text-gray-700">Gọi mua hàng 08:00-22:00: <span className="text-red-600 font-bold">0976123554</span></p>
            <div className="flex gap-2">
              <input type="text" placeholder="Nhập số điện thoại yêu cầu tư vấn" className="text-xs p-2 rounded border flex-1" />
              <button className="bg-red-700 text-white text-xs px-3 py-2 rounded font-bold hover:bg-red-800">GOỊ CHO TÔI</button>
            </div>
          </div>
        </div>

        {/* Khối bên phải: Thông số & Chính sách (Cột 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-50 p-3 rounded border text-xs space-y-2">
            <p><strong>Thương hiệu:</strong> Dunlopillo</p>
            <p><strong>Kết cấu:</strong> 1 mảnh 25 cm</p>
            <p><strong>Chất liệu:</strong> Cao su thiên nhiên 100% nhập khẩu</p>
            <p><strong>Loại:</strong> Đệm êm, nảy</p>
            <p><strong>Bảo hành:</strong> 10 năm</p>
          </div>

          <div className="bg-blue-50 p-3 rounded border border-blue-100 text-xs space-y-2">
            <h3 className="font-bold text-blue-900 border-l-4 border-blue-600 pl-2">Chính sách bán hàng</h3>
            <p>• Miễn phí vận chuyển nội thành Hà Nội</p>
            <p>• Hỗ trợ 50% phí vận chuyển ngoại thành</p>
            <p>• Phí vận chuyển phụ thuộc các đơn vị COD: GHTK, Viettel Post, GHN...</p>
          </div>
        </div>
      </div>
    </main>
  );
}