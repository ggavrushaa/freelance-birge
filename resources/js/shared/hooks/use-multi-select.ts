// import { useState } from 'react';

// export interface UseMultiSelectResult<T> {
//     items: T[];
//     add: (item: T) => T[];
//     remove: (item: T) => void;
//     has: (item: T) => boolean;
// }

// export function useMultiSelect<T>(
//     initialItems: T[] = [],
//     options?: { isEqual?: (a: T, b: T) => boolean },
// ): UseMultiSelectResult<T> {
//     const [items, setItems] = useState<T[]>(initialItems);

//     const isEqual = options?.isEqual ?? ((a, b) => a === b);

//     const add = (item: T) => {
//         const newItems = [...items,item];
//         setItems(newItems);
//         return newItems;
//     };

//     const remove = (item: T) => {
//         setItems((prev) => prev.filter((i) => i !== item));
//     };

//     const has = (item: T) => items.some((i) => isEqual(i, item));

//     return { items, add, remove, has };
// }
