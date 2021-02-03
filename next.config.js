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
        source: "/Classes/classroom", 
        destination: "/classes/classroom"
      },
      {
        source: "/classes/Classroom", 
        destination: "/classes/classroom"
      },
      {
        source: "/Classes/Classroom", 
        destination: "/classes/classroom"
      },
      {
        source: "/Classes/quiz", 
        destination: "/classes/quiz"
      },
      {
        source: "/Classes/Quiz", 
        destination: "/classes/quiz"
      },
      {
        source: "/classes/Quiz", 
        destination: "/classes/quiz"
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
      {
        source: "/Admin/Classes", 
        destination: "/admin/classes"
      },
      {
        source: "/Admin/login", 
        destination: "/admin/login"
      },
      {
        source: "/Admin/Login", 
        destination: "/admin/login"
      },
      {
        source: "/admin/Login", 
        destination: "/admin/login"
      },
    ];
  }
}