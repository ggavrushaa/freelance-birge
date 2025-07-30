import { PaginatedGigs } from '@/entities/gig';
import { PaginatedJobs } from '@/entities/job';
import { ROUTES } from '@/shared/config/routes';
import { useFetch } from '@/shared/hooks/use-fetch';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Button } from '@/shared/ui/button';
import { SharedData } from '@/types';
import { DashboardCustomer } from '@/widgets/dashboard/ui/dashboard-customer';
import DashboardFreelance from '@/widgets/dashboard/ui/dashboard-freelance';
import { Link } from '@inertiajs/react';

type DashboardPageProps = SharedData & {
    jobs: PaginatedJobs;
    gigs: PaginatedGigs;
};

const DashboardPage = (props: DashboardPageProps) => {
    const { categories, jobs, gigs } = props;
    const { data } = useFetch<{ role: string }>('/user/role');

    const renderBoard = () => {
        switch (data?.role) {
            case 'customer':
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
            case 'freelancer':
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
                                    <img
                                        className="rotate-180"
                                        src="/icons/arrow-down.svg"
                                        alt="plus"
                                    />
                                    Вывод
                                </Button>
                            </div>
                        }
                    />
                );
            default:
                return <div className="flex-1 bg-[#efeff4]"></div>;
        }
    };

    return <LayoutWithNavbar>{renderBoard()}</LayoutWithNavbar>;
};

export default DashboardPage;
