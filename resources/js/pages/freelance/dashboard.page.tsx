import { PaginatedGigs } from '@/entities/gig';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Button } from '@/shared/ui/button';
import { SharedData } from '@/types';
import DashboardFreelance from '@/widgets/dashboard/ui/dashboard-freelance';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

type FreelanceDashboardPageProps = SharedData & {
    gigs: PaginatedGigs;
};

const FreelanceDashboardPage = (props: FreelanceDashboardPageProps) => {
    const { gigs, categories } = props;

    

    return (
        <DashboardFreelance
            categories={categories}
            gigs={gigs.data || []}
            buttons={
                <div className="mb-4.5 grid grid-cols-2 gap-2 px-6">
                    <Link href={`${ROUTES.freelance.gig.create}/create`}>
                        <Button variant="secondary">
                            <img src="/icons/plus.svg" alt="plus" />
                            Создать услугу
                        </Button>
                    </Link>
                    <Button variant="secondary">
                        <img className="rotate-180" src="/icons/arrow-down.svg" alt="plus" />
                        Вывод
                    </Button>
                </div>
            }
        />
    );
};

FreelanceDashboardPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Customer dashboard" />
        {page}
    </LayoutWithNavbar>
);

export default FreelanceDashboardPage;
