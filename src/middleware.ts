import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // 보호된 경로들
  const protectedPaths = ['/', '/addTopic', '/editTopic', '/dashboard']
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  )

  // 로그인 페이지는 예외
  if (pathname === '/login') {
    return NextResponse.next()
  }

  // 보호된 경로에 접근하려는데 로그인하지 않았으면
  if (isProtectedPath && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/', '/addTopic', '/editTopic/:path*', '/dashboard', '/login'],
}