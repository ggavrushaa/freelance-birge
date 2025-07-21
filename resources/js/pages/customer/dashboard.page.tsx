import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { DashboardCustomer } from '@/widgets/dashboard/ui/dashboard-customer';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

const CustomerDashboardPage = (props: SharedData) => {
    const { categories } = props;
    return <DashboardCustomer categories={categories} />;
};

CustomerDashboardPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Customer dashboard" />
        {page}
    </LayoutWithNavbar>
);

export default CustomerDashboardPage;
