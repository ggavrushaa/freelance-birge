import * as React from 'react';
import { cn } from '../lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <div className="relative">
            <textarea
                data-slot="textarea"
                className={cn(
                    'textarea-bg textarea-border textarea-text flex field-sizing-content min-h-16 w-full resize-none rounded-md border border-input px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
                    className,
                )}
                {...props}
            />
            <p className="textarea-text absolute right-4 bottom-3">
                {props.value ? String(props.value).length : 0}/{props.maxLength}
            </p>
        </div>
    );
}

export { Textarea };
