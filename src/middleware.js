import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

const rolePath = {
  "/dashboard":["admin", "superadmin"],
  "/api":["user"]
}

export async function middleware(request) {
  // console.log("Middleware Request : ",request)
  const userToken = await getToken({req:request,secret:process.env.JWT_SECRET}) // this get user token!
  // ^^^^
  // Middleware Token : {
  //   name: 'chrisanto sinatra',
  //   email: 'c@g.co',
  //   sub: '65d6b75b1f015bb9d433ef2a',
  //   uid: '65d6b75b1f015bb9d433ef2a',
  //   roles: [ 'superadmin' ],
  //   iat: 1708940272,
  //   exp: 1711532272,
  //   jti: 'e517eb1c-549b-4f00-812e-6ebd148fbb70'
  // }

  const pathName = (new URL(request.url).pathname).split("/");

  const userRoles = userToken?.roles || [];

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}