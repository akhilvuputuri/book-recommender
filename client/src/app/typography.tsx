import { cn } from "@/lib/utils"
import { ReactNode } from "react"

/*
 * We use the `cn` utility instead of template literals for className composition because:
 * 1. It properly handles Tailwind class conflicts (later classes override earlier ones)
 * 2. Manages responsive and state variant classes correctly
 * 3. Merges classes intelligently without duplicate styles
 * 4. Maintains proper CSS specificity order
 * 
 * Example of conflict resolution:
 * cn("px-2", "px-4") -> "px-4"  // Correct override
 * `px-2 ${className}` -> "px-2 px-4"  // Both classes remain, causing conflicts
 */

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
    return (
      <h1 className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-300",
        className
      )}>
        {children}
      </h1>
    )
  }
  
  export function H2({ children, className }: TypographyProps) {
    return (
      <h2 className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-zinc-300",
        className
      )}>
        {children}
      </h2>
    )
  }
  
  export function H3({ children, className }: TypographyProps) {
    return (
      <h3 className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-300",
        className
      )}>
        {children}
      </h3>
    )
  }
  
  export function H4({ children, className }: TypographyProps) {
    return (
      <h4 className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight text-zinc-300",
        className
      )}>
        {children}
      </h4>
    )
  }
  
  export function P({ children, className }: TypographyProps) {
    return (
      <p className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 text-zinc-300",
        className
      )}>
        {children}
      </p>
    )
  }
  
  export function Lead({ children, className }: TypographyProps) {
    return (
      <p className={cn(
        "text-xl text-zinc-300",
        className
      )}>
        {children}
      </p>
    )
  }
  
  // Large already has text-zinc-300, no change needed
  export function Large({ children, className }: TypographyProps) {
    return (
      <div className={cn(
        "text-lg font-semibold text-zinc-300",
        className
      )}>
        {children}
      </div>
    )
  }
  
  export function Small({ children, className }: TypographyProps) {
    return (
      <small className={cn(
        "text-sm font-medium leading-none text-zinc-300",
        className
      )}>
        {children}
      </small>
    )
  }
  
  export function Muted({ children, className }: TypographyProps) {
    return (
      <p className={cn(
        "text-sm text-zinc-300",
        className
      )}>
        {children}
      </p>
    )
  }
  
  export function Blockquote({ children, className }: TypographyProps) {
    return (
      <blockquote className={cn(
        "mt-6 border-l-2 pl-6 italic text-zinc-300",
        className
      )}>
        {children}
      </blockquote>
    )
  }
  
  export function List({ children, className }: TypographyProps) {
    return (
      <ul className={cn(
        "my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-300",
        className
      )}>
        {children}
      </ul>
    )
  }
  
  export function InlineCode({ children, className }: TypographyProps) {
    return (
      <code className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-300",
        className
      )}>
        {children}
      </code>
    )
  }