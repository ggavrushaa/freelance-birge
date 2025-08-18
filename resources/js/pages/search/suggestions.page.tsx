import { useRoleContext } from '@/features/role';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import {
    SearchSuggestionsCustomer,
    SearchSuggestionsFreelance,
} from '@/widgets/search-suggestions';
import { ReactNode } from 'react';

const SearchSuggestionsPage = () => {
    const { role } = useRoleContext();
    if (role === 'freelancer') {
        return <SearchSuggestionsFreelance />;
    }
    return <SearchSuggestionsCustomer />;
};

SearchSuggestionsPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default SearchSuggestionsPage;
