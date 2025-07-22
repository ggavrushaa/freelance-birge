import { useState } from 'react';
import { Language } from './types';

interface UseLanguagesSelectionProps {
    initialItems: Language[];
    allItems: Language[];
}

export const useLanguagesSelection = (props: UseLanguagesSelectionProps) => {
    const { initialItems, allItems } = props;
    const [selectedItems, setSelectedItems] = useState<Language[]>(initialItems);

    const availableItems = allItems.filter(
        (lang) => !selectedItems.some((selected) => selected.id === lang.id),
    );

    const add = (lang: Language) => {
        setSelectedItems((prev) => [...prev, lang]);
    };

    const remove = (lang: Language) => {
        setSelectedItems((prev) => prev.filter((selected) => selected.id !== lang.id));
    };

    return {
        availableItems,
        selectedItems,
        add,
        remove,
    };
};
