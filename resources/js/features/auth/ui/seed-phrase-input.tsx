import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface SeedPhraseInputProps {
    length: 12;
    error?: string;
    phrase: string[];
    onChangePhrase: (index: number, newValue: string) => void;
    className?: string;
}

export const SeedPhraseInput = (props: SeedPhraseInputProps) => {
    const { length = 12, error, phrase, onChangePhrase, className = '' } = props;

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        onChangePhrase(index, event.target.value);
    };

    return (
        <div className={clsx('flex w-full flex-col gap-3', className)}>
            {Array.from({ length: length }).map((_, index) => (
                <div key={index} className="rounded-[10px] bg-input px-4 py-3.5">
                    <span className="mr-2.5 inline-block text-gray">{index + 1}.</span>
                    <input value={phrase[index] || ''} onChange={(e) => handleChange(index, e)} className="focus:outline-none" type="text" />
                </div>
            ))}
            {error && <p className="text-red max-w-[218px] text-center mx-auto">{error}</p>}
        </div>
    );
};
