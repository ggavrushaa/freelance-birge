import { JobCard } from '@/entities/job';
import { useRoleContext } from '@/features/role';
import {
    searchApi,
    SearchServicesList,
    SearchSuggestionsList,
    useSearchSuggestions,
} from '@/features/search';
import { SearchFilters as SearchFiltersType } from '@/features/search/model/types/search-filters';
import { SearchFilters } from '@/features/search/ui/search-filters';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { SharedData } from '@/types';
import { router } from '@inertiajs/react';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { ChangeEvent, ReactNode, useState } from 'react';

type View = 'categories' | 'suggestions' | 'filters';

type SearchIndexPageProps = SharedData & {
    filters: SearchFiltersType
}

const SearchIndexPage = (props: SearchIndexPageProps) => {
    console.log(props);
    const { categories, filters } = props;
    const { role } = useRoleContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<View>('categories');

    const { data: suggestions = [] } = useSearchSuggestions(searchQuery);

    const searchJobs = useMutation({
        mutationFn: (args: { search: string; filters?: Record<string, unknown> }) =>
            searchApi.getJobs({
                search: args.search,
                ...(args.filters || {}),
            }),
    });
    const searchGigs = useMutation({
        mutationFn: (args: { search: string; filters?: Record<string, unknown> }) =>
            searchApi.getGigs({
                search: args.search,
                ...(args.filters || {}),
            }),
    });

    const handleClickCategory = (categoryId: number) => {
        router.get(ROUTES.searchShow(categoryId));
    };

    const handleClickSuggestion = (suggestionText: string) => {
        if (role === 'customer') {
            searchGigs.mutate({
                search: suggestionText,
            });
        } else {
            searchJobs.mutate({
                search: suggestionText,
            });
        }
        setView('filters');
    };

    const handleClickSubFilter = (filters: Record<string, unknown>) => {
        if (role === 'customer') {
            searchGigs.mutate({
                search: searchQuery,
                filters,
            });
        } else {
            searchJobs.mutate({
                search: searchQuery,
                filters,
            });
        }
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
                    suggestions={suggestions}
                />
            )}
            {isFiltersVisible && <SearchFilters refetch={handleClickSubFilter} filters={filters} />}
            {isFiltersVisible && (
                <div>
                    {searchJobs.data?.jobs.data.map((searchJob) => (
                        <JobCard
                            imageUrl={searchJob.photo}
                            categoryName={searchJob.category.name}
                            price={searchJob.price}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

SearchIndexPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default SearchIndexPage;
