import { NextResponse } from "next/server"
import { auth as middleware } from "auth"

export default middleware(async (request) => {
	const { auth, nextUrl } = request

	const isLoginPage = nextUrl.pathname.startsWith("/login")

	// Enter login page if not signed in
	if (!auth && !isLoginPage) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	// Return to Home when entering login page if signed in
	if (auth && isLoginPage) {
		return NextResponse.redirect(new URL("/", request.url))
	}
})

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
}
