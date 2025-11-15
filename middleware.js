export { default } from 'next-auth/middleware'

// Protect specific routes - add routes you want to protect here
export const config = {
  matcher: [
    // Add your protected routes here
    // '/dashboard/:path*',
    // '/profile/:path*',
    // '/settings/:path*',
  ]
}

// If you want to protect routes conditionally, you can use custom middleware:
// import { withAuth } from 'next-auth/middleware'
// export default withAuth(
//   function middleware(req) {
//     // Additional middleware logic here
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// )

