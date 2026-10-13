/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ẩn biểu tượng chữ N của Next.js ở góc màn hình khi chạy dev (lỗi vẫn hiện bình thường)
  devIndicators: false,
  // 85: ảnh chính đầu trang (nét hơn); 75: mặc định cho ảnh còn lại
  images: { qualities: [75, 85] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
