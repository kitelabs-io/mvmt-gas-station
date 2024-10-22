
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function GithubButton() {
  return <Link
    href={siteConfig.links.github}
    target="_blank"
    rel="noreferrer"
  >
    <div
      className={buttonVariants({
        size: "icon",
        variant: "ghost",
      })}
    >
      <Icons.gitHub className="size-5" />
      <span className="sr-only">GitHub</span>
    </div>
  </Link>
}
