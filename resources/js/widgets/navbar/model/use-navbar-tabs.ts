import { useRoleContext } from '@/features/role';
import { ChatIcon, CreateIcon, HomeIcon, OrderIcon, ProfileIcon } from '../icons';
import { ROUTES } from '@/shared/config/routes';

export const useNavbarTabs = () => {
    const { role } = useRoleContext();
    const tabs = [
        { key: 'home', label: 'Главная', Icon: HomeIcon, href: '/dashboard' },
        { key: 'chat', label: 'Чат', Icon: ChatIcon, href: '#' },
        {
            key: 'create',
            label: 'Создать',
            Icon: CreateIcon,
            href: role === 'customer' ? `/${ROUTES.customer.job.index}/create` : `/${ROUTES.freelance.gig.index}/create`,
        },
        {
            key: 'order',
            label: 'Заказы',
            Icon: OrderIcon,
            href: '/orders/page',
        },
        { key: 'profile', label: 'Профиль', Icon: ProfileIcon, href: '/profile' },
    ];
    return tabs;
};
