import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VISTAR — Influencer Marketing & Talent Management Agency",
    short_name: "VISTAR",
    description: "Maharashtra's leading regional influencer marketing and creator talent management agency.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090E",
    theme_color: "#00C8FF",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
