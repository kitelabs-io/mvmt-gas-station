// for page navigation & to sort on leftbar

export type EachRoute = {
	title: string
	href: string
	noLink?: true
	items?: EachRoute[]
}

export const ROUTES: EachRoute[] = [
	{
		title: "Getting Started",
		href: "/",
		items: [
			{ title: "Create a Gas Station", href: "create-gas-station" },
			{ title: "Integrate with dApp", href: "integrate-with-dapp" },
		],
	},
]

type Page = { title: string; href: string }

function getRecurrsiveAllLinks(node: EachRoute) {
	const ans: Page[] = []
	if (!node.noLink) {
		ans.push({ title: node.title, href: node.href })
	}
	node.items?.forEach((subNode) => {
		const temp = { ...subNode, href: `${node.href}${subNode.href}` }
		ans.push(...getRecurrsiveAllLinks(temp))
	})
	return ans
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat()
