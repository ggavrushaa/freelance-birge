import { Link, usePage } from '@inertiajs/react';
import { Text } from '@/shared/ui/text';
import { ChatIcon, CreateIcon, HomeIcon, OrderIcon, ProfileIcon } from '../icons';

const tabs = [
  { key: 'home', label: 'Главная', Icon: HomeIcon, href: '/dashboard' },
  { key: 'chat', label: 'Чат', Icon: ChatIcon, href: '/chat' },
  { key: 'create', label: 'Создать', Icon: CreateIcon, href: '/create' },
  { key: 'order', label: 'Заказы', Icon: OrderIcon, href: '/orders' },
  { key: 'profile', label: 'Профиль', Icon: ProfileIcon, href: '/profile/show' },
];

export const Navbar = () => {
  const { url } = usePage();
  return (
    <div className="py-2 grid grid-cols-5 gap-2 justify-between bg-white rounded-xl px-6 pb-8">
      {tabs.map(({ key, label, Icon, href }) => {
        const isActive = url.startsWith(href);
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
