/**
 * Dữ liệu sản phẩm + bảng giá + combo.
 * Dùng chung cho UI và API /api/order (server tính lại tiền từ file này,
 * nên khách không thể sửa giá phía trình duyệt).
 *
 * ⚠️ Giá / tên mẫu / size dưới đây là NỘI DUNG MẪU cho bản demo —
 * thay bằng số liệu thật của shop trước khi chạy quảng cáo.
 */

/**
 * Ảnh HD (1600px) — xử lý từ public/images/hd_images:
 * váy nâu được tách góc trước / sau / cận ngực, váy hồng bỏ viền trắng.
 */
const p = (name) => `/images/products/${name}-hd.webp`;

export const IMAGES = {
  mocha: p("mocha"),
  mochaFront: p("mocha-front"),
  mochaBack: p("mocha-back"),
  mochaDetail: p("mocha-detail"),
  blush: p("blush"),
  // Bản tách nền (PNG trong suốt → webp) — đặt trực tiếp lên nền be, không khung
  mochaFrontCut: p("mocha-front-cut"),
  mochaBackCut: p("mocha-back-cut"),
  mochaDetailCut: p("mocha-detail-cut"),
  blushCut: p("blush-cut"),
  // Bản riêng cho hero (ảnh LCP) — tách file để Next nhận diện đúng ảnh cần tải sớm
  heroBlushCut: p("hero-blush-cut"),
  pjFloral: p("pj-floral"),
  pjLavender: p("pj-lavender"),
  pjNavy: p("pj-navy"),
  pjPudding: p("pj-pudding"),
  pjBunny: p("pj-bunny2"), // đã cắt nhãn "40–60kg" ở góc ảnh gốc
};

const DRESS_SIZES = [
  { id: "S", hint: "40–46kg" },
  { id: "M", hint: "47–52kg" },
  { id: "L", hint: "53–58kg" },
  { id: "XL", hint: "59–65kg" },
];

const PJ_SIZES = [
  { id: "M", hint: "38–48kg" },
  { id: "L", hint: "49–57kg" },
  { id: "XL", hint: "58–65kg" },
];

export const PRODUCTS = [
  {
    id: "dam-satin-mocha",
    collection: "evening",
    name: "Đầm lụa satin Mocha",
    subtitle: "Kèm khăn choàng voan kem",
    tag: "Best seller",
    hot: true,
    price: 690000,
    salePrice: 459000,
    material: "Satin lụa 2 da, rủ mềm, không nhăn",
    description: "Thiết kế cúp ngực ôm sát, chất satin bóng mờ rủ mềm theo từng bước đi — kèm khăn choàng voan kem cho vẻ thanh lịch trọn vẹn.",
    highlights: ["Cúp ngực xếp ly tôn vòng một", "Dáng đuôi cá ôm nhẹ, tôn đường cong", "Tặng kèm khăn choàng voan kem", "Lót trong mềm, không lộ nội y"],
    care: "Giặt tay nhẹ với nước lạnh, không vắt xoắn. Phơi trong bóng râm, là ở nhiệt độ thấp mặt trái vải.",
    gallery: [IMAGES.mochaFrontCut, IMAGES.mochaBackCut, IMAGES.mochaDetailCut, IMAGES.mocha],
    colors: [{ id: "mocha", label: "Nâu Mocha", hex: "#6b3a1f", image: IMAGES.mochaFront, cutout: IMAGES.mochaFrontCut }],
    sizes: DRESS_SIZES,
  },
  {
    id: "dam-tulle-blush",
    collection: "evening",
    name: "Đầm tulle Blush cổ V",
    subtitle: "Chân váy xoè 3 lớp",
    tag: "Tiệc cưới",
    hot: true,
    price: 720000,
    salePrice: 489000,
    material: "Tulle lưới mềm 3 lớp, cúp ngực định hình",
    description: "Cổ V thanh thoát, eo chiết ly và chân váy tulle 3 lớp bồng nhẹ — vừa đủ lộng lẫy cho tiệc cưới, vừa dịu dàng cho những buổi hẹn.",
    highlights: ["Cổ V sâu vừa phải, tôn xương quai xanh", "Eo chiết ly tạo dáng chữ A", "Chân váy tulle 3 lớp xoè mà không cộm", "Khoá kéo ẩn sau lưng"],
    care: "Giặt tay nhẹ hoặc giặt khô. Treo móc rộng vai, tránh gấp chân váy lâu để tulle không bị nếp.",
    gallery: [IMAGES.blushCut, IMAGES.blush],
    colors: [{ id: "blush", label: "Hồng Blush", hex: "#e8b4ae", image: IMAGES.blush, cutout: IMAGES.blushCut }],
    sizes: DRESS_SIZES,
  },
  {
    id: "bo-babydoll-coc-tay",
    collection: "home",
    name: "Bộ mặc nhà Baby-doll",
    subtitle: "Áo cộc tay dáng xoè + quần đùi",
    tag: "Bán chạy",
    hot: true,
    price: 259000,
    salePrice: 169000,
    material: "Cotton lụa mềm mát, thấm hút tốt",
    description: "Áo babydoll xoè nhẹ che bụng, quần đùi cạp chun co giãn — mát lạnh khi chạm, mặc ngủ, mặc nhà hay xuống phố cà phê đều xinh.",
    highlights: ["Cotton lụa mát lạnh, không xù", "Dáng babydoll che khuyết điểm vòng hai", "Quần cạp chun co giãn thoải mái", "4 hoạ tiết xinh xắn, phối combo tuỳ ý"],
    care: "Giặt máy chế độ nhẹ trong túi lưới, lộn trái khi giặt để giữ màu hoạ tiết. Không dùng thuốc tẩy.",
    colors: [
      { id: "floral", label: "Hoa nhí kem", hex: "#efd9c6", image: IMAGES.pjFloral },
      { id: "lavender", label: "Hoa lavender", hex: "#cfc4e6", image: IMAGES.pjLavender },
      { id: "navy", label: "Navy anh đào", hex: "#24305a", image: IMAGES.pjNavy },
      { id: "pudding", label: "Vàng Pudding", hex: "#f1d28a", image: IMAGES.pjPudding },
    ],
    sizes: PJ_SIZES,
  },
  {
    id: "bo-dai-tay-tho",
    collection: "home",
    name: "Bộ dài tay Thỏ hồng",
    subtitle: "Áo cổ nơ + quần dài",
    tag: "Thu – Đông",
    price: 289000,
    salePrice: 189000,
    material: "Cotton dày dặn, ấm mà vẫn thoáng",
    description: "Áo dài tay cổ nơ tua rua cùng quần dài hoạ tiết thỏ hồng — ấm áp cho những đêm se lạnh mà vẫn thoáng, không bí.",
    highlights: ["Cotton dày dặn, ấm mà thoáng", "Cổ nơ tua rua điệu đà", "Bo chun cổ tay giữ ấm", "Freesize 40–60kg"],
    care: "Giặt máy chế độ nhẹ, lộn trái. Phơi nơi thoáng mát để vải giữ độ mềm.",
    colors: [{ id: "bunny", label: "Trắng hồng", hex: "#f3e1ec", image: IMAGES.pjBunny }],
    sizes: [{ id: "Freesize", hint: "40–60kg" }],
  },
];

/** Mẫu hot — hiện ở khu "Đặt nhanh" trên trang chủ; đủ mẫu thì vào trang Bộ sưu tập. */
export const HOT_PRODUCTS = PRODUCTS.filter((p) => p.hot);

export const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "evening", label: "Đầm dạ hội" },
  { id: "home", label: "Đồ mặc nhà" },
];

export function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "";
}

/** Ảnh đã tách nền (đặt lên nền be, object-contain) hay ảnh chụp thường (object-cover). */
export function isCutout(src) {
  return src.includes("-cut-");
}

/** Đường dẫn trang chi tiết — kèm ?mau= khi trỏ tới một màu / hoạ tiết cụ thể. */
export function productUrl(product, colorId) {
  const base = `/san-pham/${product.id}`;
  return colorId && product.colors.length > 1 ? `${base}?mau=${colorId}` : base;
}

/** Ảnh cho trang chi tiết: nhiều màu → mỗi màu 1 ảnh; 1 màu → gallery riêng của mẫu. */
export function productGallery(product) {
  if (product.colors.length > 1) return product.colors.map((c) => c.image);
  return product.gallery ?? [product.colors[0].cutout ?? product.colors[0].image];
}

/** Mỗi màu / hoạ tiết là một thẻ trong trang bộ sưu tập. */
export function collectionItems() {
  return PRODUCTS.flatMap((p) =>
    p.colors.map((c, i) => {
      const gallery = productGallery(p);
      const cover = c.cutout ?? c.image;
      const hover = p.colors.length > 1 ? c.image : gallery.find((src) => src !== cover && isCutout(src)) ?? gallery[1];
      return {
        key: `${p.id}-${c.id}`,
        product: p,
        color: c,
        href: productUrl(p, c.id),
        cover,
        hover: hover && hover !== cover ? hover : null,
        featured: i === 0,
      };
    }),
  );
}

/** Combo số lượng — chọn 1, 2 hoặc 3 cái (theo brief). */
export const COMBOS = [
  { qty: 1, label: "1 sản phẩm", discount: 0, perk: "Giá flash sale" },
  { qty: 2, label: "Combo 2", discount: 0.1, perk: "Giảm thêm 10% · Freeship" },
  { qty: 3, label: "Combo 3", discount: 0.15, perk: "Giảm thêm 15% · Freeship", popular: true },
];

export const SHIPPING_FEE = 30000;

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function discountPercent(product) {
  return Math.round((1 - product.salePrice / product.price) * 100);
}

/** Tính tiền đơn hàng — dùng cả ở client (hiển thị) và server (chốt giá). */
export function quote(product, qty) {
  const combo = COMBOS.find((c) => c.qty === qty) ?? COMBOS[0];
  const subtotal = product.salePrice * combo.qty;
  const discount = Math.round((subtotal * combo.discount) / 1000) * 1000;
  const shipping = combo.qty >= 2 ? 0 : SHIPPING_FEE;
  const original = product.price * combo.qty;
  const total = subtotal - discount + shipping;
  const saved = original - subtotal + discount + (shipping === 0 ? SHIPPING_FEE : 0);
  return { combo, subtotal, discount, shipping, total, original, saved };
}
