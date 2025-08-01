import { CategoryCard } from '@/entities/category';
import { Gig } from '@/entities/gig';
import { jobIconsUrls } from '@/entities/job';
import { useFocus } from '@/shared/hooks/use-focus';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Logo } from '@/shared/ui/logo';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { Link, router } from '@inertiajs/react';
import cls from 'classnames';
import { ChangeEvent, ReactNode, useState } from 'react';
import { DashboardBalance } from './dashboard-balance';
import { DashboardOrder } from './dashboard-order';
import { DashboardOrdersWidget } from './dashboard-orders-widget';
import { DashboardSlider } from './dashboard-slider/dashboard-slider';

interface DashboardFreelanceProps {
    categories: SharedData['categories'];
    gigs: Gig[];
    buttons: ReactNode;
}

const DashboardFreelance = (props: DashboardFreelanceProps) => {
    const { categories, gigs = [], buttons } = props;
    const searchInput = useFocus();
    const [showAllGigs, setShowAllGigs] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(params.get('search') ?? '');

    const toggleShowAllJobs = () => {
        setShowAllGigs((prev) => !prev);
    };

    const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const redirectToJobsPage = () => {
        router.get('/customer-job', {
            search: searchQuery,
        });
    };

    const visibleGigs = showAllGigs ? gigs : gigs.slice(0, 3);

    return (
        <main className="flex-1 bg-[#efeff4] pt-20">
            <Logo className="mx-auto mb-7 h-12.5 w-28" />
            <div className="mb-4 px-6">
                <InputWithIcon
                    value={searchQuery}
                    placeholder="Поиск"
                    renderIcon={() => <img src="/icons/search.svg" alt="search" />}
                    onChange={handleChangeSearchInput}
                    onFocus={searchInput.focus}
                    onBlur={searchInput.blur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            redirectToJobsPage();
                        }
                    }}
                    className={cls(
                        'rounded-xl py-1 pl-[40%] transition-all duration-300',
                        searchInput.isFocused && 'pl-3',
                    )}
                />
            </div>
            <div className="mb-3 flex items-center justify-between px-6">
                <Title>Популярные услуги</Title>
                <Text className="cursor-pointer font-medium text-gray select-none">Все</Text>
            </div>
            <ul className="scrollbar-hide mb-3 flex gap-3 overflow-auto px-6">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageUrl={category.icon as string}
                        color={category.color as string}
                        className="w-full min-w-[100px] rounded-xl p-2.5"
                    />
                ))}
            </ul>
            <DashboardBalance />
            {buttons}
            <div className="mb-4 px-6">
                <DashboardSlider />
            </div>
            {gigs.length > 0 && (
                <DashboardOrdersWidget
                    header={
                        <div className="flex items-center justify-between">
                            <Title className="font-medium text-primary">Активные</Title>
                            <Text
                                className="cursor-pointer font-medium text-gray select-none"
                                onClick={toggleShowAllJobs}
                            >
                                {showAllGigs ? 'Свернуть' : 'Все'}
                            </Text>
                        </div>
                    }
                    orders={visibleGigs}
                    renderOrder={(order) => (
                        <Link
                            key={order.id}
                            href={`/freelance-gig/${order.id}`}
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

export default DashboardFreelance;
