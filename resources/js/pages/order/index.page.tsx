import { useRoleContext } from '@/features/role';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { OrdersCustomerPage, OrdersFreelancePage } from '@/widgets/order';
import { ReactNode } from 'react';

export const OrderIndexPage = () => {
    const { role } = useRoleContext();

    if (role === 'customer') {
        return <OrdersCustomerPage />;
    }

    return <OrdersFreelancePage />;
};

OrderIndexPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default OrderIndexPage;
