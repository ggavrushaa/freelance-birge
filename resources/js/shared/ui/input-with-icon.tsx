import { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface InputWithIconProps extends ComponentProps<'input'> {
    renderIcon: () => ReactNode;
    className?: string;
}

export const InputWithIcon = (props: InputWithIconProps) => {
    const { className, type, renderIcon, ...rest } = props;
    return (
        <div className={cn('flex items-center gap-2 bg-input px-3 py-2', className)}>
            {renderIcon()}
            <input type={type} className='focus:outline-none' data-slot="input" {...rest} />
        </div>
    );
};
