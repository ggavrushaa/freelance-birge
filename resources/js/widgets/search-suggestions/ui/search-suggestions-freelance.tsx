import { JobCard } from '@/entities/job';
import { searchApi, SearchSuggestionsList, useSearchSuggestions } from '@/features/search';
import { SearchFilters } from '@/features/search/ui/search-filters';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { useSearchParams } from '@/shared/hooks/use-search-params';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { Link } from '@inertiajs/react';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';

type View = 'suggestions' | 'filters';

export const SearchSuggestionsFreelance = () => {
    const { filters } = usePageProps();
    const searchParams = useSearchParams();
    const query = searchParams.params.get('query');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [view, setView] = useState<View>('filters');

    const searchSuggestions = useSearchSuggestions(searchQuery);

    const searchJobs = useMutation({
        mutationFn: (args: { search: string; filters?: Record<string, unknown> }) =>
            searchApi.getJobs({
                search: args.search,
                ...(args.filters || {}),
            }),
    });

    useEffect(() => {
        searchJobs.mutate({
            search: searchQuery,
        });
    }, []);

    const handleClickSuggestion = (suggestionText: string) => {
        searchJobs.mutate({
            search: suggestionText,
        });
        setView('filters');
        setSearchQuery(suggestionText);
    };

    console.log("asca")

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
            searchParams.set('query', e.target.value);
        } else {
            setView('filters');
            searchParams.remove('query');
        }
    };

    const isSuggestionsVisible = view === 'suggestions';
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

            {isSuggestionsVisible && (
                <SearchSuggestionsList
                    onClickSuggestion={handleClickSuggestion}
                    suggestions={searchSuggestions?.data || []}
                />
            )}
            {isFiltersVisible && <SearchFilters refetch={handleClickSubFilter} filters={filters} />}
            {isFiltersVisible && (
                <div className="flex flex-col gap-2">
                    {searchJobs.data?.jobs.data.map((searchJob) => (
                        <Link href={`/customer-job/${searchJob.id}`}>
                            <JobCard
                                key={searchJob.id}
                                title={searchJob.name}
                                isPremium={searchJob.premium_mode}
                                price={searchJob.price}
                                description={searchJob.description}
                                terms={getDayLabel(searchJob.terms)}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};
