import { useRoleContext } from '@/features/role';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { OrdersCustomerPage } from '@/widgets/order';
import { ReactNode } from 'react';

export const OrderIndexPage = () => {
    const { role } = useRoleContext();

    if (role === 'customer') {
        return <OrdersCustomerPage />;
    }

    return null;
};

OrderIndexPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        {page}
    </LayoutWithNavbar>
);

export default OrderIndexPage;
