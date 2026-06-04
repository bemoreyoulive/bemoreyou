import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BeMoreYou — Coaching Portal",
    short_name: "BeMoreYou",
    description: "Your personal coaching portal",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1EC",
    theme_color: "#1C1C1C",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
