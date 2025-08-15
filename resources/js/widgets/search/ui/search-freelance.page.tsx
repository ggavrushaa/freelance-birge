import { GigCard } from '@/entities/gig';
import {
    searchApi,
    SearchServicesList,
    SearchSuggestionsList,
    useSearchSuggestions,
} from '@/features/search';
import { SearchFilters } from '@/features/search/ui/search-filters';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Link, router } from '@inertiajs/react';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';

type View = 'categories' | 'suggestions' | 'filters';

export const SearchFreelancePage = () => {
    const { categories, filters } = usePageProps();
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<View>('categories');

    const searchSuggestions = useSearchSuggestions(searchQuery);

    const searchJobs = useMutation({
        mutationFn: (args: { search: string; filters?: Record<string, unknown> }) =>
            searchApi.getJobs({
                search: args.search,
                ...(args.filters || {}),
            }),
    });

    const handleClickCategory = (categoryId: number) => {
        router.get(ROUTES.searchShow(categoryId));
    };

    const handleClickSuggestion = (suggestionText: string) => {
        searchJobs.mutate({
            search: suggestionText,
        });
        setView('filters');
        setSearchQuery(suggestionText);
    };

    const handleClickSubFilter = (filters: Record<string, unknown>) => {
        searchJobs.mutate({
            search: searchQuery,
            filters,
        });
    };

    const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length) {
            setView('suggestions');
        } else {
            setView('categories');
        }
    };

    const isSuggestionsVisible = view === 'suggestions';
    const isCategoriesVisible = view === 'categories';
    const isFiltersVisible = view === 'filters';

    return (
        <section className="flex-1 bg-[#efeff4] px-6 pt-25">
            <InputWithIcon
                value={searchQuery}
                onChange={handleChangeSearchQuery}
                placeholder="Поиск"
                renderIcon={() => <img src="/icons/search.svg" alt="search" className="mr-3" />}
                className={classNames('mb-4.5 flex-1 gap-0 rounded-xl py-2')}
            />
            {isCategoriesVisible && (
                <SearchServicesList categories={categories} onClick={handleClickCategory} />
            )}

            {isSuggestionsVisible && (
                <SearchSuggestionsList
                    onClickSuggestion={handleClickSuggestion}
                    suggestions={searchSuggestions?.data || []}
                />
            )}
            {isFiltersVisible && <SearchFilters refetch={handleClickSubFilter} filters={filters} />}
            {isFiltersVisible && (
                <div>
                    {searchJobs.data?.jobs.data.map((searchJob) => (
                        <Link href={`customer-job/${searchJob.id}`}>
                            <GigCard
                                key={searchJob.id}
                                title={searchJob.name}
                                isPremium={searchJob.premium_mode}
                                price={searchJob.price}
                                description={searchJob.description}
                                createdAt={searchJob.created_at}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};
