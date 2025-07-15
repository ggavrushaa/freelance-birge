import { SharedData } from '@/types';
import { DashboardCustomer } from '@/widgets/dashboard/ui/dashboard-customer';
import { Navbar } from '@/widgets/navbar';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

const CustomerDashboardPage = (props: SharedData) => {
    const { categories } = props;
    return <DashboardCustomer categories={categories} />;
};

CustomerDashboardPage.layout = (page: ReactNode) => (
    <div className="flex min-h-[100svh] flex-col">
        <Head title="Customer dashboard" />
        {page}
        <footer>
            <Navbar />
        </footer>
    </div>
);

export default CustomerDashboardPage;
