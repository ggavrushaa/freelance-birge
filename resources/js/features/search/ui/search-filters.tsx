import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import classNames from 'classnames';
import { ComponentProps, memo, ReactNode, useState } from 'react';
import { SearchFilters as SearchFiltersType } from '../model/types/search-filters';

interface SearchFiltersItemProps extends ComponentProps<'div'> {
    text: string;
    icon?: ReactNode;
}
interface SearchFiltersProps {
    filters: SearchFiltersType;
    refetch: (filters: Record<string, unknown>) => void;
}

const useSearchFilters = (refetch: (filters: Record<string, unknown>) => void) => {
    const [filtersState, setFiltersState] = useState<Record<string, string>>({});
    const [activeFilter, setActiveFilter] = useState<string>('');
    const handleClickMainFilter = (filterKey: string) => {
        const filtersStateKeys = Object.keys(filtersState);
        if (filtersStateKeys.includes(filterKey)) {
            const updatedState = Object.entries(filtersState).filter(([key]) => key !== filterKey);
            setFiltersState(Object.fromEntries(updatedState));
            setActiveFilter('');
        } else {
            setFiltersState((prev) => ({
                ...prev,
                [filterKey]: 'all',
            }));
            setActiveFilter(filterKey);
        }
    };

    const handleClickSubFilter = (newValue: string) => {
        setFiltersState((prev) => {
            const updated = {
                ...prev,
                [activeFilter]: newValue,
            };
            refetch(updated);
            return updated;
        });
    };
    return {
        filtersState,
        activeFilter,
        handleClickMainFilter,
        handleClickSubFilter,
    };
};

export const SearchFiltersItem = memo((props: SearchFiltersItemProps) => {
    const { text, icon = null, ...rest } = props;
    return (
        <Card
            {...rest}
            className={classNames('w-fit flex-row items-center gap-1 px-3 py-2', props.className)}
        >
            {icon}
            <Text fontSize={15} fontColor="black">
                {text}
            </Text>
        </Card>
    );
});
export const SearchFilters = (props: SearchFiltersProps) => {

    const { filters = {}, refetch } = props;
    console.log(filters);
    const { filtersState, activeFilter, handleClickMainFilter, handleClickSubFilter } =
        useSearchFilters(refetch);

    const isActiveMainFilter = (filterKey: string) => {
        return Object.keys(filtersState).includes(filterKey);
    };
    const isActiveSubFilter = (key: string, value: string) => {
        return filtersState[activeFilter] === value || key === filtersState[activeFilter];
    };

    const subFilters = activeFilter ? filters[activeFilter].options : null;

    return (
        <>
            <div className="scrollbar-hide mb-3 flex gap-2 overflow-auto">
                {Object.entries(filters).map(([filterKey]) => (
                    <SearchFiltersItem
                        key={filterKey}
                        text={filters[filterKey].label}
                        icon={isActiveMainFilter(filterKey) && <img src="/icons/check.svg" />}
                        onClick={() => handleClickMainFilter(filterKey)}
                        className={classNames('shrink-0 border border-transparent', {
                            'border-primary': isActiveMainFilter(filterKey),
                        })}
                    />
                ))}
            </div>
            <div className="mb-3 flex flex-wrap gap-3">
                {subFilters &&
                    Object.entries(subFilters).map(([key, value], index) => (
                        <SearchFiltersItem
                            key={index}
                            text={value}
                            onClick={() => handleClickSubFilter(key)}
                            className={classNames('shrink-0 border border-transparent', {
                                'border-primary': isActiveSubFilter(key, value),
                            })}
                        />
                    ))}
            </div>
        </>
    );
};
