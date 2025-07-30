import { Text } from '@/shared/ui/text';
import { Link, usePage } from '@inertiajs/react';
import { ChatIcon, CreateIcon, HomeIcon, OrderIcon, ProfileIcon } from '../icons';

const tabs = [
    { key: 'home', label: 'Главная', Icon: HomeIcon, href: '/customer/dashboard' },
    { key: 'chat', label: 'Чат', Icon: ChatIcon, href: '#' },
    { key: 'create', label: 'Создать', Icon: CreateIcon, href: '/customer-job/create' },
    { key: 'order', label: 'Заказы', Icon: OrderIcon, href: '/customer-job' },
    { key: 'profile', label: 'Профиль', Icon: ProfileIcon, href: '/profile' },
];

export const Navbar = () => {
    const { url } = usePage();
    return (
        <div className="grid grid-cols-5 justify-between gap-2 rounded-xl bg-white px-6 py-2 pb-8">
            {tabs.map(({ key, label, Icon, href }) => {
                const isActive = url.includes(href);
                return (
                    <Link
                        key={key}
                        href={href}
                        className="flex flex-col items-center"
                        preserveScroll
                    >
                        <Icon
                            stroke={isActive ? '#007aff' : '#ADB3BC'}
                            fill={isActive ? '#007aff' : '#ADB3BC'}
                        />
                        <Text fontSize={12} className={isActive ? 'text-primary!' : ''}>
                            {label}
                        </Text>
                    </Link>
                );
            })}
        </div>
    );
};
