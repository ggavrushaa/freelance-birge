import { GigCard } from '@/entities/gig';
import { findLowestTarrifPrice } from '@/entities/tariff';
import { SearchSuggestionsList, useSearchSuggestions } from '@/features/search';
import { useSearchGigs } from '@/features/search/model/hooks/use-search-gigs';
import { SearchFilters } from '@/features/search/ui/search-filters';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { useSearchParams } from '@/shared/hooks/use-search-params';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';

type View = 'suggestions' | 'filters';

export const SearchSuggestionsCustomer = () => {
    const { filters } = usePageProps();
    const searchParams = useSearchParams();
    const query = searchParams.params.get('query');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [view, setView] = useState<View>('filters');

    const searchSuggestions = useSearchSuggestions(searchQuery);

    const searchGigs = useSearchGigs();

    useEffect(() => {
        searchGigs.mutate({
            search: searchQuery,
        });
    }, []);

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
                    {searchGigs.data?.gigs.data.map((searchGig) => (
                        <Link href={`/freelance-gig/${searchGig.id}`}>
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
