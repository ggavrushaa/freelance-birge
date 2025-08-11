import clsx from 'clsx';
import React, { ComponentProps, forwardRef } from 'react';

interface SeedPhraseProps {
    seedPhrase: string[];
    renderInput: (word: string, index: number) => React.ReactNode;
    error?: string;
    className?: string;
}

interface SeedPhraseInputProps extends ComponentProps<"input"> {
    index: number;
    orderNumber?: number;
    value: string;
    error?: string;
}

export const SeedPhrase = (props: SeedPhraseProps) => {
    const { seedPhrase, error, renderInput } = props;
    return (
        <div className={clsx('flex w-full flex-col gap-3', props.className)}>
            {seedPhrase.map((word, index) => renderInput(word, index))}
            {error && <p className="mx-auto max-w-[218px] text-center text-red">{error}</p>}
        </div>
    );
};

SeedPhrase.Input = forwardRef<HTMLInputElement, SeedPhraseInputProps>((props, ref) => {
    const {
        index,
        orderNumber,
        value,
        error,
        disabled = false,
        className,
        ...rest
    } = props;

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     onChange?.(index, event.target.value);
    // };

    return (
        <div
            className={clsx(
                'relative flex items-center rounded-[10px] bg-input px-4 py-3.5',
                className,
                error && 'border border-red',
            )}
        >
            <span className="absolute top-[50%] left-4 mr-2.5 inline-block translate-y-[-50%] text-gray">
                {orderNumber ?? index + 1}.
            </span>
            <input
                ref={ref}
                disabled={disabled}
                value={value ?? ''}
                type="text"
                className="ml-5 focus:outline-none"
                {...rest}
            />
        </div>
    );
});
