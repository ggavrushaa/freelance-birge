import { useState } from "react";
import { Tariff } from "./types";

export const useTariffs = ({ initialValue }: { initialValue: Partial<Tariff>[] }) => {
    const [items, setItems] = useState(initialValue);

    const add = () => {
        setItems([
            ...items,
            {
                id: items.length + 1,
                name: ``,
                description: '',
                price: 0,
                term: 1,
                additional_options: [],
                corrections: 0,
            },
        ]);
    };

    const edit = (id: number, data: Partial<Tariff>) => {
        setItems((prevItems) =>
            prevItems.map((prevItem) => (prevItem.id === id ? { ...prevItem, ...data } : prevItem)),
        );
    };

    const remove = (index: number) => {
        setItems(items.filter((_, id) => id !== index));
    };

    return {
        items,
        add,
        edit,
        remove,
    };
};