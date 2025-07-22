import { useState } from 'react';
import { Skill } from './types';

interface UseLSkillsSelectionProps {
    initialItems: Skill[];
    allItems: Skill[];
}

export const useSkillsSelection = (props: UseLSkillsSelectionProps) => {
    const { initialItems, allItems } = props;
    const [selectedItems, setSelectedItems] = useState<Skill[]>(initialItems);

    const availableItems = allItems.filter(
        (lang) => !selectedItems.some((selected) => selected.id === lang.id),
    );

    const add = (skill: Skill) => {
        setSelectedItems((prev) => [...prev, skill]);
    };

    const remove = (skill: Skill) => {
        setSelectedItems((prev) => prev.filter((selected) => selected.id !== skill.id));
    };

    return {
        availableItems,
        selectedItems,
        add,
        remove,
    };
};
