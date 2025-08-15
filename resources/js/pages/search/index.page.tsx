import { useRoleContext } from '@/features/role';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SearchCustomerPage, SearchFreelancePage } from '@/widgets/search';
import { ReactNode } from 'react';

const SearchIndexPage = () => {
    const { role } = useRoleContext();
    console.log(role,"role");
    if (role === 'customer') {
        return <SearchCustomerPage />;
    }
    return <SearchFreelancePage />;
};

SearchIndexPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default SearchIndexPage;
