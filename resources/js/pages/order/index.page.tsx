import { OrderArchiveCard, OrderCard, OrderTab } from '@/entities/order';
import { withExpand } from '@/shared/components/hoc/with-expand';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Card } from '@/shared/ui/card';
import { Head } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

const ExpandableOrderArchiveCard = withExpand(OrderArchiveCard);

export const OrderIndexPage = () => {
    const [activeTab, setActiveTab] = useState<'orders' | 'service'>('orders');

    const handleClickTab = (name: 'orders' | 'service') => {
        setActiveTab(name);
    };

    return (
        <section className="flex-1 flex-col bg-[#efeff4] p-6 pt-25">
            <Card className="mb-4 grid grid-cols-2 gap-0 p-1">
                <OrderTab
                    onClick={() => handleClickTab('orders')}
                    isActive={activeTab === 'orders'}
                    title="Заказы"
                    count={1}
                />
                <OrderTab
                    onClick={() => handleClickTab('service')}
                    isActive={activeTab === 'service'}
                    title="Услуги"
                    count={100}
                />
            </Card>
            <ExpandableOrderArchiveCard isOpen={activeTab === 'service'} />
            <div className="flex flex-col gap-2">
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
        </section>
    );
};

OrderIndexPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Jobs page" />
        {page}
    </LayoutWithNavbar>
);

export default OrderIndexPage;
