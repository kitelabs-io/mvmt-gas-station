import Link from "next/link"

import { SigninForm } from "./signin-form"

export default async function AuthenticationPage() {
	return (
		<div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Create an account
					</h1>
					<p className="text-muted-foreground text-sm">
						Enter your email below to create your account
					</p>
				</div>
				<SigninForm />
				<p className="text-muted-foreground px-8 text-center text-sm">
					By clicking continue, you agree to our{" "}
					<Link
						href="/terms"
						className="hover:text-primary underline underline-offset-4"
					>
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						href="/privacy"
						className="hover:text-primary underline underline-offset-4"
					>
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
