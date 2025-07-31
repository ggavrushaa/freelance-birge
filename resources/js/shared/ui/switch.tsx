import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '../lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                'peer switch-bg data-[state=unchecked]:switch-bg dark:data-[state=unchecked]:switch-bg inline-flex h-[1.25rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary',
                className,
            )}
            style={{
                background: props.checked ? '#007aff' : 'rgba(36, 36, 36, 0.25)',
            }}
            {...props}
        >
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className={cn(
                    'pointer-events-none block size-3.5 rounded-full bg-[#fff] ring-0 transition-transform data-[state=unchecked]:translate-x-[2px] dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-[#fff]',
                )}
                style={{
                    transform: props.checked ? 'translateX(13px)' : 'translateX(1px)',
                }}
            />
        </SwitchPrimitive.Root>
    );
}

export { Switch };
