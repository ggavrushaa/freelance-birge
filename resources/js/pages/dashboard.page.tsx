import { PaginatedGigs } from '@/entities/gig';
import { PaginatedJobs } from '@/entities/job';
import { useRoleContext } from '@/features/role';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Button } from '@/shared/ui/button';
import { SharedData } from '@/types';
import { DashboardCustomer } from '@/widgets/dashboard/ui/dashboard-customer';
import DashboardFreelance from '@/widgets/dashboard/ui/dashboard-freelance';
import { Link } from '@inertiajs/react';
import { viewport } from '@telegram-apps/sdk';
import { useEffect } from 'react';

type DashboardPageProps = SharedData & {
    jobs: PaginatedJobs;
    gigs: PaginatedGigs;
};

const DashboardPage = (props: DashboardPageProps) => {
    const { categories, jobs, gigs } = props;
    const { role } = useRoleContext();

    useEffect(() => {
        viewport.mount()
        console.log(viewport.isMounted());
        console.log(viewport.expand.isAvailable());
    }, []);
    const renderBoard = () => {
        switch (role) {
            case 'customer':
                return (
                    <DashboardCustomer
                        categories={categories}
                        jobs={jobs?.data || []}
                        buttons={
                            <div className="mb-4.5 grid grid-cols-2 gap-2 px-6">
                                <Link href={`/customer-job/create`}>
                                    <Button variant="secondary">
                                        <img src="/icons/plus.svg" alt="plus" />
                                        Создать заказ
                                    </Button>
                                </Link>
                                <Button
                                    variant="secondary"
                                    onClick={ async () => {
                                        console.log("Requesting fullscreen...");
                                        viewport.expand();
                                        console.log("Viewport is fullscreen:", viewport.isFullscreen());
                                        // console.log('Open top-up modal');
                                        // window.Telegram.WebApp.ready()
                                        // window.Telegram.WebApp.expand();
                                    }}
                                >
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
                        gigs={gigs?.data || []}
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
