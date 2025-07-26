import { PaginatedJobs } from '@/entities/job';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Button } from '@/shared/ui/button';
import { SharedData } from '@/types';
import { DashboardCustomer } from '@/widgets/dashboard/ui/dashboard-customer';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

type CustomerDashboardPageProps = SharedData & {
    jobs: PaginatedJobs;
};

const CustomerDashboardPage = (props: CustomerDashboardPageProps) => {
    const { categories, jobs } = props;
    return (
        <DashboardCustomer
            categories={categories}
            jobs={jobs.data || []}
            buttons={
                <div className="mb-4.5 grid grid-cols-2 gap-2 px-6">
                    <Link href={`/customer-job/create`}>
                        <Button variant="secondary">
                            <img src="/icons/plus.svg" alt="plus" />
                            Создать заказ
                        </Button>
                    </Link>
                    <Button variant="secondary">
                        <img src="/icons/arrow-down.svg" alt="plus" />
                        Пополнить
                    </Button>
                </div>
            }
        />
    );
};

CustomerDashboardPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Customer dashboard" />
        {page}
    </LayoutWithNavbar>
);

export default CustomerDashboardPage;
