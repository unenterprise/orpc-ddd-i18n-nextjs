import { NextRequest, NextResponse } from "next/server"

const locales = ["en", "fr"]
const DEFAULT_LOCALE = "en"

function getLocale(_request: NextRequest) {
  return DEFAULT_LOCALE
}

function hasLocale(pathname: string) {
  return locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
}

function stripLocale(pathname: string) {
  const locale = locales.find((l) => pathname.startsWith(`/${l}/`))
  return locale ? pathname.replace(`/${locale}`, "") : pathname
}

function getToken(request: NextRequest) {
  return (
    request.cookies.get("access_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "")
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  /**
   * 1. JWT guard for /dashboard
   */
  const pathnameNoLocale = stripLocale(pathname)

  if (pathnameNoLocale.startsWith("/dashboard")) {
    const token = getToken(request)

    if (!token) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/login"
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  /**
   * 2. Locale redirect
   */
  if (hasLocale(pathname)) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    "/((?!_next|robots.txt|favicon.ico|rpc|api).*)"
  ]
}
