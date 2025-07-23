import { useState } from 'react';
import { Tariff } from './types';

export const useTariffs = ({ initialValue }: { initialValue: Tariff[] }) => {
    const [items, setItems] = useState(initialValue);

    const add = () => {
        const newItem = {
            id: items.length + 1,
            name: ``,
            description: '',
            price: 0,
            term: 1,
            additional_options: null,
            corrections: 0,
        };
        setItems([...items, newItem]);
        return newItem;
    };

    const edit = (id: number, data: Partial<Tariff>) => {
        setItems((prevItems) =>
            prevItems.map((prevItem) => (prevItem.id === id ? { ...prevItem, ...data } : prevItem)),
        );
    };

    const remove = (itemId: number) => {
        setItems(prevItems => prevItems.filter((item) => item.id !== itemId));
        
    };

    console.log(items);
    return {
        items,
        add,
        edit,
        remove,
    };
};
