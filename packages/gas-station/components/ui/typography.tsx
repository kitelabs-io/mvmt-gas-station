import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type TypographyProps = PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLHeadingElement
  >
>

export function Typography({ children }: PropsWithChildren) {
  return (
    <div className="prose-code:font-code prose prose-zinc w-[85vw] !min-w-full pt-2 dark:prose-invert prose-headings:scroll-m-20 prose-code:rounded-md prose-code:bg-neutral-100 prose-code:p-1 prose-code:text-sm prose-code:leading-6 prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:bg-neutral-100 prose-img:rounded-md prose-img:border dark:prose-code:bg-neutral-900 dark:prose-code:text-white dark:prose-pre:bg-neutral-900 sm:mx-auto sm:w-full">
      {children}
    </div>
  );
}

Typography.H1 = function H1({ children, className, ...restProps }: TypographyProps) {
  return (
    <h1
      {...restProps}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  )
}

Typography.H2 = function H2({ children, className, ...restProps }: TypographyProps) {
  return (
    <h2
      {...restProps}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  )
}

Typography.H3 = function H3({ children, className, ...restProps }: TypographyProps) {
  return (
    <h3
      {...restProps}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  )
}

Typography.H4 = function H4({ children, className, ...restProps }: TypographyProps) {
  return (
    <h4
      {...restProps}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  )
}

Typography.Muted = function Muted({ children, className, ...restProps }: TypographyProps) {
  return (
    <p
      {...restProps}
      className={cn("text-sm text-muted-foreground", className)}
    >
      {children}
    </p>
  )
}

Typography.Code = function Code({ children, className, ...restProps }: TypographyProps) {
  return (
    <code
      {...restProps}
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  )
}
