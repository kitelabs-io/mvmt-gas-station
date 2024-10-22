import { NavItem } from "@/types/nav"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: "Movement Gas Station",
	description: "Gas Station for Movement",
	mainNav: [
		{
			title: "Gas Station",
			href: "/gas-station",
		},
		{
			title: "Getting Started",
			href: "https://github.com/kitelabs-io/mvmt-gas-station/blob/main/docs/getting-started/index.mdx",
			public: true,
			external: true,
		},
	] as NavItem[],
	links: {
		github: "https://github.com/kitelabs-io/mvmt-gas-station",
	},
}
