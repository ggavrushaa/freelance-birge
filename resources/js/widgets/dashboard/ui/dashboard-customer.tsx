import { CategoryCard } from '@/entities/category';
import { Job, jobIconsUrls } from '@/entities/job';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import { DashboardBalance } from './dashboard-balance';
import { DashboardHeader } from './dashboard-header';
import { DashboardOrder } from './dashboard-order';
import { DashboardOrdersWidget } from './dashboard-orders-widget';
import { DashboardSlider } from './dashboard-slider/dashboard-slider';

interface DashboardCustomerProps {
    categories: SharedData['categories'];
    jobs: Job[];
    buttons: ReactNode;
}

export const DashboardCustomer = (props: DashboardCustomerProps) => {
    const { categories = [], jobs = [], buttons } = props;
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(params.get('search') ?? '');

    const redirectToJobsPage = () => {
        router.get('/freelance-gig', {
            search: searchQuery,
        });
    };

    const visibleJobs = jobs.slice(0, 3);

    return (
        <main className="flex-1 bg-[#efeff4] pt-20">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onEnter={redirectToJobsPage}
            />
            <ul className="scrollbar-hide mb-3 flex gap-3 overflow-auto px-6">
                <div className="h-[100px] rounded-[12px] border-2 border-[#007aff] p-[2px]">
                    <CategoryCard
                        name={'Лайкнутые'}
                        imageUrl="/images/heart.png"
                        color="linear-gradient(225deg, #61adff 0%, #006ce1 100%), linear-gradient(225deg, #ff6f6c 0%, #de0500 100%), linear-gradient(225deg, #c38bff 0%, #007aff 100%)"
                        className="h-full w-full min-w-[100px] rounded-[10px] p-2.5"
                    />
                </div>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageUrl={category.icon as string}
                        color={category.color as string}
                        className="h-[100px] w-full min-w-[100px] rounded-xl p-2.5"
                    />
                ))}
            </ul>
            <DashboardBalance />
            {buttons}
            <div className="mb-4 px-6">
                <DashboardSlider />
            </div>
            {jobs.length > 0 && (
                <DashboardOrdersWidget
                    header={
                        <div className="flex items-center justify-between">
                            <Title className="font-medium text-primary">Активные</Title>
                            <Text className="cursor-pointer font-medium text-gray select-none">
                                Все
                            </Text>
                        </div>
                    }
                    orders={visibleJobs}
                    renderOrder={(order) => (
                        <Link
                            key={order.id}
                            href={`/customer-job/${order.id}`}
                            className="border-b border-gray"
                        >
                            <DashboardOrder
                                imageUrl={jobIconsUrls[order.status]}
                                name={order.name}
                                status={order.status}
                                createdAt={order.created_at}
                            />
                        </Link>
                    )}
                />
            )}
        </main>
    );
};
