/** @type {import('next').NextConfig} */
const nextConfig = {
  // Protótipo de demonstração: não deve ser indexado.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
module.exports = nextConfig;
