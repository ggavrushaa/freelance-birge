import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "../lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer switch-bg data-[state=checked]:bg-primary data-[state=unchecked]:switch-bg focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:switch-bg inline-flex h-[1.25rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-3.5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-1px)] data-[state=unchecked]:translate-x-[2px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
