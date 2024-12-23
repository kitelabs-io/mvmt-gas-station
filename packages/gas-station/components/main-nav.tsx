"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
	items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
	const searchParams = useSearchParams()
	return (
		<div className="flex gap-6 md:gap-10">
			<Link href="/" className="flex items-center space-x-2">
				<Icons.logo className="size-6" />
				<span className="inline-block font-bold">{siteConfig.name}</span>
			</Link>
			{items?.length ? (
				<nav className="flex gap-6">
					{items?.map((item, index) => {
						return (
							item.href && (
								<Link
									key={index}
									// Should keep the state of search params on soft routing
									href={
										item.href +
										(item.external ? "" : `?${searchParams.toString()}`)
									}
									className={cn(
										"flex items-center text-sm font-medium",
										item.disabled && "cursor-not-allowed opacity-80"
									)}
									{...(item.external && {
										target: "_blank",
										rel: "noopener noreferrer",
									})}
								>
									{item.title}{" "}
									{item.external && <Icons.externalLink className="size-6" />}
								</Link>
							)
						)
					})}
				</nav>
			) : null}
		</div>
	)
}
