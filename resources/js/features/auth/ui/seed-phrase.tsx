import clsx from 'clsx';
import React, { ChangeEvent } from 'react';

interface SeedPhraseProps {
    seedPhrase: string[];
    renderInput: (word: string, index: number) => React.ReactNode;
    error?: string;
    className?: string;
}

interface SeedPhraseInputProps {
    index: number;
    value: string;
    error?: string;
    disabled?: boolean;
    onChange?: (index: number, newValue: string) => void;
    className?: string;
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

SeedPhrase.Input = (props: SeedPhraseInputProps) => {
    const { index, value, onChange, error, disabled = false } = props;

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(index, event.target.value);
    };

    return (
        <div
            key={index}
            className={clsx(
                'relative flex items-center rounded-[10px] bg-input px-4 py-3.5',
                props.className,
                error && 'border border-red',
            )}
        >
            <span className="absolute top-[50%] left-4 mr-2.5 inline-block translate-y-[-50%] text-gray">
                {index + 1}.
            </span>
            <input
                disabled={disabled}
                value={value ?? ''}
                onChange={(e) => handleChange(index, e)}
                className="ml-5 focus:outline-none"
                type="text"
            />
        </div>
    );
};
