import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

const rolePath = {
  "/inventory":["admin", "superadmin"],
  "/dashboard":["user", "admin", "superadmin"],
  "/api/register": ["guest"],
  "/api/graphql": ["guest"],
  "/api":["user","admin","superadmin"],
}

export async function middleware(request) {
  // console.log("Middleware Request : ",request)
  const userToken = await getToken({req:request, secret:process.env.NEXTAUTH_SECRET}) // this get user token!
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

  const pathName = (new URL(request.url).pathname)
  const userRole = userToken?.role || "guest";


  let rp = "" // path target as key in rolePath
  for(let rpath of Object.keys(rolePath)){
    if(pathName.includes(rpath)){
        rp = rpath
        break;
    }
  }

  if(rp == ""){
    return NextResponse.next();
  }

  const isAuthorized = rolePath[rp].includes("guest") || rolePath[rp].includes(userRole)

  if(isAuthorized){
    return NextResponse.next();
  }else{
    if(pathName.includes("/api")){
      // API Unauthorized middleware access
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
    }else{
      // Page unauthorized middleware redirect
      return NextResponse.redirect(process.env.NEXTAUTH_URL+"/login");
    }
  }
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
    '/((?!api/auth/*|_next/static|_next/image|favicon.ico).*)',
  ],
}