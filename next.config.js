const { getRedirectStatus } = require("next/dist/lib/load-custom-routes");

module.exports = {
  /* config options here */
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/Courses", 
        destination: "/courses"
      },
      {
        source: "/Courses/classroom", 
        destination: "/courses/classroom"
      },
      {
        source: "/Courses/Classroom", 
        destination: "/courses/classroom"
      },
      {
        source: "/Courses/Classroom", 
        destination: "/courses/classroom"
      },
      {
        source: "/Courses/quiz", 
        destination: "/courses/quiz"
      },
      {
        source: "/Courses/Quiz", 
        destination: "/courses/quiz"
      },
      {
        source: "/Courses/Quiz", 
        destination: "/courses/quiz"
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