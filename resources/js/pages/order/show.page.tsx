import { Gig } from '@/entities/gig';
import { Job } from '@/entities/job';
import { useRoleContext } from '@/features/role';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { OrderShowFreelancePage } from '@/widgets/order';
import { OrderShowCustomerPage } from '@/widgets/order/ui/order-show-customer.page';
import { ReactNode } from 'react';

interface OrderShowPageProps {
    order: Gig | Job;
}

const OrderShowPage = (props: OrderShowPageProps) => {
    const { role } = useRoleContext();
    const { order } = props;

    if (role === 'freelancer') {
        return <OrderShowFreelancePage order={order as Gig} />;
    }

    return <OrderShowCustomerPage order={order as Job} />;
};

OrderShowPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default OrderShowPage;
