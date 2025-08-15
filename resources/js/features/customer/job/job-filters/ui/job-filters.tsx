import { InputWithIcon } from '@/shared/ui/input-with-icon';
import cls from 'classnames';
import { JobFiltersItem } from './job-filters-item';
import { useState } from 'react';
import classNames from 'classnames';

export const JOB_FILTERS = [
    { id: 'deadline', text: 'Срок выполнения' },
    { id: 'seller-level', text: 'Уровень продавца' },
    { id: 'reviews-range', text: 'Диапазон отзывов' },
    { id: 'premium', text: 'Premium' },
    { id: 'similar', text: 'Похожие' },
];

interface JobFiltersProps {
    searchQuery: string;
    onChangeSearchQuery: (value: string) => void;
}

export const JobFilters = (props:JobFiltersProps) => {
    const { searchQuery, onChangeSearchQuery } = props;
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const isActiveFilter = (value: string) => {
        return activeFilters.includes(value);
    };

    const addFilter = (value: string) => {
        setActiveFilters((prev) => [...prev, value]);
    };

    const removeFilter = (value: string) => {
        setActiveFilters((prev) => prev.filter((prevFilter) => prevFilter !== value));
    };

    const resetFilters = () => {
        setActiveFilters([]);
    };

    const handleClickFilter = (value: string) => {
        if (value === 'all') {
            resetFilters();
            addFilter(value);
            return;
        }
        if (isActiveFilter(value)) {
            removeFilter(value);
        } else {
            addFilter(value);
        }
    };

    return (
        <div>
            <InputWithIcon
                placeholder="Поиск"
                renderIcon={() => <img src="/icons/search.svg" alt="search" />}
                className={cls('mb-3 rounded-xl py-1')}
                value={searchQuery}
                onChange={(e) => onChangeSearchQuery(e.target.value)}
            />
            <div className="scrollbar-hide flex gap-2 overflow-auto">
                <JobFiltersItem
                    icon={<img className="h-4.5 w-4.5" src="/icons/filters-all.svg" />}
                    text="Все"
                    onClick={() => handleClickFilter('all')}
                    className={classNames('shrink-0 border border-transparent', {
                        'border-primary': activeFilters.includes('all'),
                    })}
                />
                {JOB_FILTERS.map((jobFilter) => (
                    <JobFiltersItem
                        key={jobFilter.id}
                        text={jobFilter.text}
                        icon={isActiveFilter(jobFilter.id) && <img src="/icons/check.svg" />}
                        onClick={() => handleClickFilter(jobFilter.id)}
                        className={classNames('shrink-0 border border-transparent', {
                            'border-primary': activeFilters.includes(jobFilter.id),
                        })}
                    />
                ))}
            </div>
        </div>
    );
};
