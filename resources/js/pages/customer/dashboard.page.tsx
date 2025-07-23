import { Job } from '@/entities/job';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { DashboardCustomer } from '@/widgets/dashboard/ui/dashboard-customer';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

type CustomerDashboardPageProps = SharedData & {
    jobs: Job[];
}

const CustomerDashboardPage = (props: CustomerDashboardPageProps) => {
    const { categories ,jobs } = props;
    console.log(jobs);
    return <DashboardCustomer categories={categories} jobs={jobs.data}/>;
};

CustomerDashboardPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Customer dashboard" />
        {page}
    </LayoutWithNavbar>
);

export default CustomerDashboardPage;
