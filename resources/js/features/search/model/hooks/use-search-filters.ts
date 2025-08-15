import { useState } from 'react';

const booleanFilters = ['express_mode', 'premium_mode', 'similar'];

export const useSearchFilters = (refetch: (filters: Record<string, unknown>) => void) => {
    const [filtersState, setFiltersState] = useState<Record<string, string>>({});
    const [activeFilter, setActiveFilter] = useState<string>('');

    const remoweMainFilter = (filterKey: string) => {
        const updatedState = Object.entries(filtersState).filter(([key]) => key !== filterKey);
        setFiltersState(Object.fromEntries(updatedState));
        setActiveFilter('');
        if (booleanFilters.includes(filterKey)) {
            refetch(Object.fromEntries(updatedState));
        }
    };

    const addMainFilter = (filterKey: string) => {
        setFiltersState((prev) => {
            const updatedState = {
                ...prev,
                [filterKey]: 'all',
            };
            if (booleanFilters.includes(filterKey)) {
                refetch(updatedState);
            }
            return updatedState;
        });
        setActiveFilter(filterKey);
    };

    const toggleMainFilter = (filterKey: string) => {
        const filtersStateKeys = Object.keys(filtersState);
        if (filtersStateKeys.includes(filterKey)) {
            remoweMainFilter(filterKey);
        } else {
            addMainFilter(filterKey);
        }
    };

    const handleClickSubFilter = (newValue: string) => {
        setFiltersState((prev) => {
            const updatedState = {
                ...prev,
                [activeFilter]: newValue,
            };
            refetch(updatedState);
            return updatedState;
        });
    };

    return {
        filtersState,
        activeFilter,
        toggleMainFilter,
        handleClickSubFilter,
    };
};
