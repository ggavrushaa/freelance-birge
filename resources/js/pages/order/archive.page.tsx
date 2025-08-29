import { Job } from '@/entities/job';
import { OrderArchiveCard, OrderCard, useGetOrders } from '@/entities/order';
import { ROUTES } from '@/shared/config/routes';
import { statusIcons } from '@/shared/consts';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export const OrderArchivePage = () => {
    const { data } = useGetOrders();
    const archive = (data?.archive ?? []) as Job[];
    return (
        <section className="flex-1 flex-col bg-[#efeff4] p-6 pt-25">
            <OrderArchiveCard count={archive.length} className="mb-4" />
            <div className="flex flex-col gap-2">
                {archive.map((archiveItem) => (
                    <Link key={archiveItem.id} href={ROUTES.orderShow(archiveItem.id)}>
                        <OrderCard
                            icon={
                                <img
                                    src={statusIcons[archiveItem.status]}
                                    className="w-7 opacity-20"
                                />
                            }
                            title={archiveItem.name}
                            status={archiveItem.status}
                            terms={archiveItem.terms}
                            price={parseFloat(archiveItem.price)}
                            count={null}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};

OrderArchivePage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default OrderArchivePage;
