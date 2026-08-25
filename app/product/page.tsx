"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Nồi chiên không dầu",
    category: "Đồ dùng nhà bếp",
    icon: "🍳",
    price: 1290000,
    oldPrice: 1590000,
    rating: 4.8,
    reviewsCount: 124,
    description: "Nồi chiên không dầu dung tích lớn 5.5L, điều khiển nhiệt độ điện tử chính xác. Công nghệ chiên chân không Rapid Air giúp giảm 85% lượng mỡ thừa.",
    specs: ["Dung tích: 5.5 Lit", "Công suất: 1800W", "Chất liệu: Thép không gỉ", "Bảo hành: 12 tháng"]
  },
  {
    id: 2,
    name: "Quạt điện thông minh",
    category: "Điện gia dụng",
    icon: "🌀",
    price: 890000,
    oldPrice: 1090000,
    rating: 4.6,
    reviewsCount: 89,
    description: "Quạt điện vận hành êm ái, hỗ trợ điều khiển từ xa qua Remote và ứng dụng di động.",
    specs: ["Đường kính cánh: 40cm", "Công suất: 45W", "Độ ồn: < 35dB", "Bảo hành: 24 tháng"]
  },
  {
    id: 3,
    name: "Máy hút bụi gia đình",
    category: "Thiết bị vệ sinh",
    icon: "🧹",
    price: 2490000,
    oldPrice: 2890000,
    rating: 4.9,
    reviewsCount: 210,
    description: "Máy hút bụi cầm tay không dây lực hút siêu mạnh 20.000Pa. Bộ lọc HEPA đa lớp lọc sạch bụi mịn.",
    specs: ["Lực hút: 20000 Pa", "Thời lượng pin: 45 phút", "Trọng lượng: 1.5kg", "Bảo hành: 12 tháng"]
  },
  {
    id: 4,
    name: "Máy pha cà phê",
    category: "Đồ dùng nhà bếp",
    icon: "☕",
    price: 1990000,
    oldPrice: 2290000,
    rating: 4.7,
    reviewsCount: 65,
    description: "Máy pha cà phê Espresso nhỏ gọn phù hợp cho gia đình và văn phòng.",
    specs: ["Áp suất: 15 Bar", "Dung tích nước: 1.2L", "Công suất: 1050W", "Bảo hành: 12 tháng"]
  },
  {
    id: 5,
    name: "Nồi cơm điện cao tần",
    category: "Đồ dùng nhà bếp",
    icon: "🍚",
    price: 1790000,
    oldPrice: 2090000,
    rating: 4.9,
    reviewsCount: 178,
    description: "Công nghệ đốt nóng trong IH giúp hạt cơm chín đều từ trong ra ngoài, giữ trọn dưỡng chất.",
    specs: ["Dung tích: 1.8 Lit", "Lòng nồi: Hợp kim 5 lớp", "Công suất: 1300W", "Bảo hành: 12 tháng"]
  },
  {
    id: 6,
    name: "Robot hút bụi",
    category: "Thiết bị vệ sinh",
    icon: "🤖",
    price: 4990000,
    oldPrice: 5690000,
    rating: 5.0,
    reviewsCount: 340,
    description: "Robot hút bụi lau nhà thông minh tích hợp điều hướng LiDAR quét bản đồ 3D.",
    specs: ["Lực hút: 4000 Pa", "Pin: 5200 mAh", "Lưu bản đồ: 3 tầng", "Bảo hành: 24 tháng"]
  },
  {
    id: 7,
    name: "Đèn bàn thông minh",
    category: "Điện gia dụng",
    icon: "💡",
    price: 590000,
    oldPrice: 750000,
    rating: 4.5,
    reviewsCount: 42,
    description: "Đèn học chống cận thị với dải ánh sáng tự nhiên không nhấp nháy.",
    specs: ["Công suất: 10W", "Chỉ số hoàn màu: Ra>90", "Cổng sạc: Type-C", "Bảo hành: 12 tháng"]
  },
  {
    id: 8,
    name: "Kệ để đồ đa năng",
    category: "Nội thất gia đình",
    icon: "🗄️",
    price: 790000,
    oldPrice: 950000,
    rating: 4.7,
    reviewsCount: 95,
    description: "Kệ thép carbon 4 tầng chịu lực lên tới 150kg. Có bánh xe di chuyển tiện lợi.",
    specs: ["Kích thước: 60x35x120cm", "Chất liệu: Thép sơn tĩnh điện", "Tải trọng: 150kg", "Bảo hành: 6 tháng"]
  }
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id);
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl">🔍</div>
        <h1 className="mt-4 text-2xl font-bold">Không tìm thấy sản phẩm</h1>
        <p className="mt-2 text-gray-500">Sản phẩm bạn tìm kiếm không tồn tại.</p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Trở về Trang chủ
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    if (!product) return;

    const savedCart = localStorage.getItem("homeshop-cart");
    let cart: Record<number, number> = {};

    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch {}
    }

    cart[product.id] = (cart[product.id] || 0) + quantity;
    localStorage.setItem("homeshop-cart", JSON.stringify(cart));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 notranslate" translate="no">
            HomeShop
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600">
            ← Quay lại mua sắm
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="grid grid-cols-1 gap-10 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2">
          <div className="relative flex h-80 items-center justify-center rounded-xl bg-gray-100 text-9xl md:h-full">
            {product.icon}
            {product.oldPrice && (
              <span className="absolute left-4 top-4 rounded bg-red-500 px-3 py-1 text-xs font-bold text-white notranslate" translate="no">
                GIẢM GIÁ
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm font-medium text-blue-600">{product.category}</span>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex text-amber-400">{"★".repeat(Math.floor(product.rating))}</div>
                <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewsCount} đánh giá)</span>
              </div>

              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-3xl font-bold text-red-500">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                )}
              </div>

              <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900">Thông số kỹ thuật:</h3>
                <ul className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">Số lượng:</span>
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700"
                >
                  {added ? "✓ Đã thêm vào giỏ!" : "Thêm vào giỏ hàng"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}