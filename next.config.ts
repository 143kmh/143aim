import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем standalone режим билда для Hetzner VPS
  output: "standalone",
  // Разрешаем загрузку внешних аватарок Steam и иконок рангов
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.steamstatic.com" },
      { protocol: "https", hostname: "media.valorant-api.com" },
      { protocol: "https", hostname: "d15f34w2p8l1cc.cloudfront.net" },
    ],
  },
};

export default nextConfig;