import { GigCard } from '@/entities/gig';
import { Tariff } from '@/entities/tariff/model/types';
import {
    searchApi,
    SearchServicesList,
    SearchSuggestionsList,
    useSearchSuggestions,
} from '@/features/search';
import { SearchFilters } from '@/features/search/ui/search-filters';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { useSearchParams } from '@/shared/hooks/use-search-params';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Link, router } from '@inertiajs/react';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';

type View = 'categories' | 'suggestions' | 'filters';

export const SearchCustomerPage = () => {
    const { categories, filters } = usePageProps();
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<View>('categories');
    const searchParams = useSearchParams();

    const searchSuggestions = useSearchSuggestions(searchQuery);

    const searchGigs = useMutation({
        mutationFn: (args: { search: string; filters?: Record<string, unknown> }) => {
            const subCategoryId = searchParams.params.get('subCategoryId');
            console.log(subCategoryId);

            return searchApi.getGigs({
                search: args.search,
                ...(args.filters || {}),
            });
        },
    });

    const handleClickCategory = (categoryId: number) => {
        router.get(ROUTES.searchShow(categoryId));
    };

    const handleClickSuggestion = (suggestionText: string) => {
        searchGigs.mutate({
            search: suggestionText,
        });
        setView('filters');
        setSearchQuery(suggestionText);
    };

    const handleClickSubFilter = (filters: Record<string, unknown>) => {
        searchGigs.mutate({
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

    const findLowestTarrifPrice = (tariffs: Tariff[]) => {
        let minimal = 0;

        tariffs.forEach((tariff) => {
            if (minimal < tariff.price) {
                minimal = tariff.price;
            }
        });

        return String(minimal);
    };

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
                <div className="flex flex-col gap-2">
                    {searchGigs.data?.gigs.data.map((searchGig) => (
                        <Link href={`freelance-gig/${searchGig.id}`}>
                            <GigCard
                                imageUrl={searchGig.photo}
                                title={searchGig.name}
                                price={findLowestTarrifPrice(searchGig.tariffs)}
                                freelancer={searchGig.freelancer}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};
