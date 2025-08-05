import { SEED_PHRASE_LENGTH } from '@/shared/consts';
import { useState } from 'react';

interface useSeedPhraseProps {
    length: number;
}

export const useSeedPhrase = ({ length = SEED_PHRASE_LENGTH }: useSeedPhraseProps) => {
    const [phrase, setPhrase] = useState<string[]>(Array.from({ length }));

    const onChangePhrase = (index: number, newValue: string) => {
        const newPhrase = [...phrase];
        newPhrase[index] = newValue;
        setPhrase(newPhrase);
    };

    const setPhraseFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const words = text.trim().split(/\s+/);
            if (words.length !== length) {
                console.warn(`Expected ${length} words, but got ${words.length}`);
                return;
            }
            setPhrase(words);
        } catch (error) {
            console.error('Failed to read from clipboard:', error);
        }
    };

    const isPhraseFilled = () => {
        if (phrase.length !== length) return false;
        return phrase.every((word) => typeof word === 'string' && word.trim() !== '');
    };

    return {
        phrase,
        onChangePhrase,
        setPhraseFromClipboard,
        isPhraseFilled,
    };
};
