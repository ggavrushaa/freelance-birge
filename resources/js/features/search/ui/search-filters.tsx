import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import classNames from 'classnames';
import { ComponentProps, ReactNode } from 'react';
import { useSearchFilters } from '../model/hooks/use-search-filters';
import { SearchFilters as SearchFiltersType } from '../model/types/search-filters';

interface SearchFiltersItemProps extends ComponentProps<'div'> {
    text: string;
    icon?: ReactNode;
}
interface SearchFiltersProps {
    filters: SearchFiltersType;
    refetch: (filters: Record<string, unknown>) => void;
}

export const SearchFiltersItem = (props: SearchFiltersItemProps) => {
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
};

export const SearchFilters = (props: SearchFiltersProps) => {
    const { filters = {}, refetch } = props;
    const { filtersState, activeFilter, toggleMainFilter, handleClickSubFilter } =
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
                        onClick={() => {
                            toggleMainFilter(filterKey);
                        }}
                        className={classNames('shrink-0 border border-transparent', {
                            'border-primary': isActiveMainFilter(filterKey),
                        })}
                    />
                ))}
            </div>
            <div className="mb-3 flex flex-wrap gap-3">
                {subFilters &&
                    Object.keys(subFilters).length > 1 &&
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
