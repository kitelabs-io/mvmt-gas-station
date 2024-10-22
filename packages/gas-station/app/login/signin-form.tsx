import * as React from "react"
import { signIn } from "auth"

import {
	enableLoginWithEmail,
	enableLoginWithGitHub,
	enableLoginWithGoogle,
} from "@/config/vars"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function LoginWithButton({
	providerIcon,
	providerName,
	provider,
}: {
	provider: string
	providerName: string
	providerIcon: React.ReactNode
}) {
	return (
		<form
			action={async () => {
				"use server"
				await signIn(provider)
			}}
		>
			<Button className="w-full" variant="outline" type="submit">
				<div className="mr-2 size-4">{providerIcon}</div>
				{providerName}
			</Button>
		</form>
	)
}

export function SigninForm({ className, ...props }: UserAuthFormProps) {
	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={!enableLoginWithEmail}
						/>
					</div>
					<Button disabled={!enableLoginWithEmail}>
						Sign In with Email {!enableLoginWithEmail && "(Unavailable)"}
					</Button>
				</div>
			</form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				{enableLoginWithGitHub && (
					<LoginWithButton
						provider="github"
						providerName="GitHub"
						providerIcon={<Icons.gitHub />}
					/>
				)}

				{enableLoginWithGoogle && (
					<LoginWithButton
						provider="google"
						providerName="Google"
						providerIcon={<Icons.google />}
					/>
				)}
			</div>
		</div>
	)
}
