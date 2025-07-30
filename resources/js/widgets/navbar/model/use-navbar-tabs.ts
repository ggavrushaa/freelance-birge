import { useRoleContext } from '@/features/role';
import { ChatIcon, CreateIcon, HomeIcon, OrderIcon, ProfileIcon } from '../icons';

export const useNavbarTabs = () => {
    const { role } = useRoleContext();
    const tabs = [
        { key: 'home', label: 'Главная', Icon: HomeIcon, href: '/dashboard' },
        { key: 'chat', label: 'Чат', Icon: ChatIcon, href: '#' },
        {
            key: 'create',
            label: 'Создать',
            Icon: CreateIcon,
            href: role === 'customer' ? '/customer-job/create' : '/freelance-gig/create',
        },
        {
            key: 'order',
            label: 'Заказы',
            Icon: OrderIcon,
            href: role === 'customer' ? '/customer-job' : '/freelance-gig',
        },
        { key: 'profile', label: 'Профиль', Icon: ProfileIcon, href: '/profile' },
    ];
    return tabs;
};
