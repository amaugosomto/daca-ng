const { getRedirectStatus } = require("next/dist/lib/load-custom-routes");

module.exports = {
  /* config options here */
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/Classes", 
        destination: "/classes"
      },
      {
        source: "/Admin", 
        destination: "/admin"
      },
      {
        source: "/Admin/classes", 
        destination: "/admin/classes"
      },
      {
        source: "/admin/Classes", 
        destination: "/admin/classes"
      },
    ];
  }
}