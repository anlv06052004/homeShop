"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Product = {
  id: number;
  name: string;
  category: string;
  icon: string;
  price: number;
  oldPrice?: number;
  description: string;
};

type Cart = Record<number, number>;

const categories: Category[] = [
  {
    id: "kitchen",
    name: "Đồ dùng nhà bếp",
    icon: "🍳",
  },
  {
    id: "cleaning",
    name: "Thiết bị vệ sinh",
    icon: "🧹",
  },
  {
    id: "electrical",
    name: "Điện gia dụng",
    icon: "🌀",
  },
  {
    id: "furniture",
    name: "Nội thất gia đình",
    icon: "🏠",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Nồi chiên không dầu",
    category: "kitchen",
    icon: "🍳",
    price: 1290000,
    oldPrice: 1590000,
    description: "Nồi chiên dung tích lớn, điều khiển nhiệt độ tiện lợi.",
  },
  {
    id: 2,
    name: "Quạt điện thông minh",
    category: "electrical",
    icon: "🌀",
    price: 890000,
    oldPrice: 1090000,
    description: "Quạt điện vận hành êm, nhiều chế độ gió thông minh.",
  },
  {
    id: 3,
    name: "Máy hút bụi gia đình",
    category: "cleaning",
    icon: "🧹",
    price: 2490000,
    oldPrice: 2890000,
    description: "Lực hút mạnh, thiết kế gọn nhẹ và dễ sử dụng.",
  },
  {
    id: 4,
    name: "Máy pha cà phê",
    category: "kitchen",
    icon: "☕",
    price: 1990000,
    oldPrice: 2290000,
    description: "Máy pha cà phê nhỏ gọn phù hợp cho gia đình.",
  },
  {
    id: 5,
    name: "Nồi cơm điện",
    category: "kitchen",
    icon: "🍚",
    price: 1790000,
    oldPrice: 2090000,
    description: "Công nghệ cao tần giúp cơm chín đều và thơm ngon.",
  },
  {
    id: 6,
    name: "Robot hút bụi",
    category: "cleaning",
    icon: "🤖",
    price: 4990000,
    oldPrice: 5690000,
    description: "Tự động hút bụi, lau nhà và quay về trạm sạc.",
  },
  {
    id: 7,
    name: "Đèn bàn thông minh",
    category: "electrical",
    icon: "💡",
    price: 590000,
    oldPrice: 750000,
    description: "Điều chỉnh độ sáng, bảo vệ mắt khi học tập.",
  },
  {
    id: 8,
    name: "Kệ để đồ đa năng",
    category: "furniture",
    icon: "🗄️",
    price: 790000,
    oldPrice: 950000,
    description: "Kệ nhiều tầng phù hợp phòng bếp và phòng khách.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Cart>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
useEffect(() => {
  const savedCart = localStorage.getItem("homeshop-cart");

  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart) as Cart;
      setCart(parsedCart);
    } catch {
      localStorage.removeItem("homeshop-cart");
    }
  }

  setCartLoaded(true);
}, []);

useEffect(() => {
  if (cartLoaded) {
    localStorage.setItem("homeshop-cart", JSON.stringify(cart));
  }
}, [cart, cartLoaded]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesKeyword = product.name
        .toLowerCase()
        .includes(keyword.trim().toLowerCase());

      return matchesCategory && matchesKeyword;
    });
  }, [keyword, selectedCategory]);

  const cartItems = products
    .filter((product) => cart[product.id])
    .map((product) => ({
      ...product,
      quantity: cart[product.id],
    }));

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(productId: number) {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1,
    }));

    setIsCartOpen(true);
  }

  function increaseQuantity(productId: number) {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1,
    }));
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;

      if (currentQuantity <= 1) {
        const newCart = { ...currentCart };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...currentCart,
        [productId]: currentQuantity - 1,
      };
    });
  }

  function removeFromCart(productId: number) {
    setCart((currentCart) => {
      const newCart = { ...currentCart };
      delete newCart[productId];
      return newCart;
    });
  }

  function scrollToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold text-blue-600"
          >
            HomeShop
          </button>

          <nav className="hidden items-center gap-8 text-gray-700 md:flex">
            <a
              href="#home"
              className="font-medium transition hover:text-blue-600"
            >
              Trang chủ
            </a>

            <a
              href="#products"
              className="font-medium transition hover:text-blue-600"
            >
              Sản phẩm
            </a>

            <a
              href="#promotion"
              className="font-medium transition hover:text-blue-600"
            >
              Khuyến mãi
            </a>

            <a
              href="#contact"
              className="font-medium transition hover:text-blue-600"
            >
              Liên hệ
            </a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            🛒 Giỏ hàng

            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-20 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            Mua sắm tiện lợi – Giao hàng tận nơi
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Đồ gia dụng thông minh cho ngôi nhà hiện đại
          </h1>

          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Khám phá hàng trăm sản phẩm gia dụng chất lượng cao với
            mức giá tốt và nhiều chương trình khuyến mãi hấp dẫn.
          </p>

          <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm nồi chiên, máy hút bụi..."
              className="w-full rounded-lg border-0 bg-white px-5 py-3 text-gray-800 placeholder:text-gray-400 outline-none ring-blue-300 focus:ring-4"
            />

            <button
              onClick={scrollToProducts}
              className="whitespace-nowrap rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition hover:bg-gray-100"
            >
              Tìm sản phẩm
            </button>
          </div>
        </div>
      </section>
    

      {/* DANH MỤC */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">
          Danh mục sản phẩm
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Lựa chọn nhóm sản phẩm phù hợp với nhu cầu của bạn
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                scrollToProducts();
              }}
              className={`rounded-xl border p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                selectedCategory === category.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="text-5xl">{category.icon}</div>

              <h3 className="mt-4 font-bold">{category.name}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* KHUYẾN MÃI */}
      <section id="promotion" className="px-6 pb-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-2xl bg-orange-500 p-8 text-white md:flex-row md:p-12">
          <div>
            <p className="font-semibold uppercase tracking-wider">
              Ưu đãi cuối tuần
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Giảm đến 30% sản phẩm gia dụng
            </h2>

            <p className="mt-3 text-orange-100">
              Áp dụng cho một số sản phẩm nổi bật tại HomeShop.
            </p>
          </div>

          <button
            onClick={scrollToProducts}
            className="rounded-lg bg-white px-6 py-3 font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Xem ưu đãi
          </button>
        </div>
      </section>

      {/* SẢN PHẨM */}
      <section id="products" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold">Sản phẩm nổi bật</h2>

              <p className="mt-2 text-gray-500">
                Có {filteredProducts.length} sản phẩm phù hợp
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Tất cả
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-12 rounded-xl bg-gray-50 p-12 text-center">
              <div className="text-6xl">🔍</div>

              <h3 className="mt-4 text-xl font-bold">
                Không tìm thấy sản phẩm
              </h3>

              <p className="mt-2 text-gray-500">
                Hãy thử tìm kiếm bằng từ khóa khác.
              </p>

              <button
                onClick={() => {
                  setKeyword("");
                  setSelectedCategory("all");
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative flex h-48 items-center justify-center bg-gray-100 text-7xl">
                    {product.icon}

                    {product.oldPrice && (
                      <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        SALE
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold">{product.name}</h3>

                    <p className="mt-2 line-clamp-2 min-h-12 text-sm text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-xl font-bold text-red-500">
                        {formatPrice(product.price)}
                      </p>

                      {product.oldPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CHÍNH SÁCH */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <div className="text-4xl">🚚</div>
          <h3 className="mt-4 font-bold">Giao hàng nhanh</h3>
          <p className="mt-2 text-sm text-gray-500">
            Giao hàng toàn quốc từ 2 đến 5 ngày.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <div className="text-4xl">🛡️</div>
          <h3 className="mt-4 font-bold">Bảo hành chính hãng</h3>
          <p className="mt-2 text-sm text-gray-500">
            Chính sách bảo hành rõ ràng và minh bạch.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <div className="text-4xl">💳</div>
          <h3 className="mt-4 font-bold">Thanh toán an toàn</h3>
          <p className="mt-2 text-sm text-gray-500">
            Hỗ trợ thanh toán khi nhận hàng.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-gray-900 px-6 py-12 text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              HomeShop
            </h2>

            <p className="mt-3 text-gray-400">
              Đồ gia dụng chất lượng cho mọi gia đình.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Liên hệ</h3>

            <p className="mt-3 text-gray-400">
              Email: homeshop@gmail.com
            </p>

            <p className="mt-2 text-gray-400">
              Điện thoại: 0123 456 789
            </p>
          </div>

          <div>
            <h3 className="font-bold">Hỗ trợ khách hàng</h3>

            <p className="mt-3 text-gray-400">
              Chính sách giao hàng
            </p>

            <p className="mt-2 text-gray-400">
              Chính sách đổi trả
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 HomeShop. All rights reserved.
        </p>
      </footer>

      {/* LỚP NỀN GIỎ HÀNG */}
      {isCartOpen && (
        <button
          aria-label="Đóng giỏ hàng"
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* GIỎ HÀNG */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-bold">Giỏ hàng của bạn</h2>

            <p className="text-sm text-gray-500">
              {totalQuantity} sản phẩm
            </p>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg bg-gray-100 px-3 py-2 text-xl hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-7xl">🛒</div>

              <h3 className="mt-5 text-xl font-bold">
                Giỏ hàng đang trống
              </h3>

              <p className="mt-2 text-gray-500">
                Hãy thêm sản phẩm bạn yêu thích.
              </p>

              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-white"
              >
                Tiếp tục mua hàng
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border p-4"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-4xl">
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>

                    <p className="mt-1 font-semibold text-red-500">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-semibold text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Tổng thanh toán</span>

              <strong className="text-2xl text-red-500">
                {formatPrice(totalPrice)}
              </strong>
            </div>

            <Link
            href="/checkout"
            className="mt-5 block w-full rounded-lg bg-green-600 py-3 text-center font-bold text-white transition hover:bg-green-700"
          >
            Tiến hành đặt hàng
          </Link>

            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-3 w-full rounded-lg border py-3 font-semibold hover:bg-gray-50"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </aside>
    </main>
  );
}
