import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/pre-register",
        destination: "/?preregister=true",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/?preregister=true",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
