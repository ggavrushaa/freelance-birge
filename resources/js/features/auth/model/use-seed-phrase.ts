import { useState } from 'react';

export const useSeedPhrase = () => {
    const [phrase, setPhrase] = useState<string[]>([]);

    const onChangePhrase = (index: number, newValue: string) => {
        const newPhrase = [...phrase];
        newPhrase[index] = newValue;
        setPhrase(newPhrase);
    };

    const isPhraseFilled = () => {
        if (phrase.length !== 12) return false;
        return phrase.every((word) => typeof word === 'string' && word.trim() !== '');
    };

    return {
        phrase,
        onChangePhrase,
        isPhraseFilled,
    };
};
