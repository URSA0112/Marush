import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'mn'] as const
type Locale = typeof locales[number]

function getLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get('locale')?.value
  if (cookie === 'en' || cookie === 'mn') return cookie
  const accept = request.headers.get('accept-language') ?? ''
  return accept.toLowerCase().startsWith('mn') ? 'mn' : 'en'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  if (hasLocale) {
    const currentLocale = pathname.split('/')[1] as Locale
    const response = NextResponse.next()
    response.cookies.set('locale', currentLocale, { path: '/', maxAge: 31536000, sameSite: 'lax' })
    return response
  }

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('locale', locale, { path: '/', maxAge: 31536000, sameSite: 'lax' })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
