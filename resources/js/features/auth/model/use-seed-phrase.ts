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

    const isPhraseFilled = () => {
        if (phrase.length !== length) return false;
        return phrase.every((word) => typeof word === 'string' && word.trim() !== '');
    };

    return {
        phrase,
        onChangePhrase,
        isPhraseFilled,
    };
};
