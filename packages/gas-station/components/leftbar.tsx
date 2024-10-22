
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { AlignLeftIcon } from "lucide-react";
import DocsMenu from "./docs-menu";

export function Leftbar() {
  return (
    <aside className="sticky top-16 hidden h-[94.5vh] min-w-[230px] flex-[1] flex-col overflow-y-auto md:flex">
      <ScrollArea className="py-4">
        <DocsMenu />
      </ScrollArea>
    </aside>
  );
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <AlignLeftIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetHeader>
          <h2 className="px-8 text-start font-extrabold">Menu</h2>
        </SheetHeader>
        <ScrollArea className="flex flex-col gap-4">
          <div className="mx-2 px-5">
            <DocsMenu isSheet />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
