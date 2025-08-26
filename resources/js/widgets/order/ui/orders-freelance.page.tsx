import { Gig } from "@/entities/gig";
import { OrderArchiveCard, OrderCard, OrderTab, useGetOrders } from "@/entities/order";
import { findLowestTarrifPrice } from "@/entities/tariff";
import { Tariff } from "@/entities/tariff/model/types";
import { withExpand } from "@/shared/components/hoc/with-expand";
import { statusIcons } from "@/shared/consts";
import { Card } from "@/shared/ui/card";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const ExpandableOrderArchiveCard = withExpand(OrderArchiveCard);

export const OrdersFreelancePage = () => {
  const { data } = useGetOrders();
    
    const [activeTab, setActiveTab] = useState<'orders' | 'service'>('orders');

    const handleClickTab = (name: 'orders' | 'service') => {
        setActiveTab(name);
    };


    const orders = (data?.orders ?? []) as Gig[];
    const archive = (data?.archive ?? []) as Gig[];

    const findLowestTarrifTerm = (tariffs: Tariff[]) => {
        let minimal = 0;
    
        tariffs.forEach((tariff) => {
            if (minimal < tariff.term) {
                minimal = tariff.term;
            }
        });
    
        return String(minimal);
    };

    return (
        <section className="flex-1 flex-col bg-[#efeff4] p-6 pt-25">
            <Card className="mb-4 grid grid-cols-2 gap-0 p-1">
                <OrderTab
                    onClick={() => handleClickTab('orders')}
                    isActive={activeTab === 'orders'}
                    title="Заказы"
                    count={0}
                />
                <OrderTab
                    onClick={() => handleClickTab('service')}
                    isActive={activeTab === 'service'}
                    title="Услуги"
                    count={orders.length}
                />
            </Card>
            <Link href="/orders/archive">
                <ExpandableOrderArchiveCard
                    count={archive.length}
                    isOpen={activeTab === 'service'}
                />
            </Link>
            {activeTab === 'service' && (
                <div className="flex flex-col gap-2">
                    {orders.map((order) => (
                        <OrderCard
                            icon={<img src={statusIcons[order.status]} className="w-7" />}
                            title={order.name}
                            status={order.status}
                            terms={findLowestTarrifTerm(order.tariffs)}
                            price={findLowestTarrifPrice(order.tariffs)}
                            count={0}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
