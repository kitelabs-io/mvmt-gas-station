
"use client";

import Anchor from "./anchor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { EachRoute } from "@/lib/route-config";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
}: EachRoute & { level: number; isSheet: boolean }) {
  const [isOpen, setIsOpen] = useState(level == 0);

  const Comp = (
    <Anchor activeClassName="text-primary font-semibold" href={href}>
      {title}
    </Anchor>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className="font-semibold text-primary sm:text-sm">{title}</h4>
  );

  if (!items) {
    return <div className="flex flex-col">{titleOrLink}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-2">
          {titleOrLink}
          <CollapsibleTrigger asChild>
            <Button
              className="ml-auto mr-3.5 size-6"
              variant="link"
              size="icon"
            >
              {!isOpen ? (
                <ChevronRight className="size-[0.9rem]" />
              ) : (
                <ChevronDown className="size-[0.9rem]" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div
            className={cn(
              "ml-0.5 mt-2.5 flex flex-col items-start gap-3 text-neutral-800 dark:text-neutral-300/85 sm:text-sm",
              level > 0 && "ml-1 border-l pl-4"
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
