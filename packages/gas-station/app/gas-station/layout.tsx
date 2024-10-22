import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { Leftbar } from "@/components/leftbar"

export default function DocsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Suspense
			fallback={
				<div className="mt-12 grid place-items-center">
					<div className="flex w-[800px] flex-col space-y-3">
						<div className="flex justify-end">
							<Skeleton className="h-10 w-28" />
						</div>
						<Skeleton className="h-32" />
						<Skeleton className="h-32" />
					</div>
				</div>
			}
		>
			{children}
		</Suspense>
	)
}
