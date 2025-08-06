import { Text } from '@/shared/ui/text';
import { Link, usePage } from '@inertiajs/react';
import { useNavbarTabs } from '../model/use-navbar-tabs';

export const Navbar = () => {
    const { url } = usePage();
    const tabs = useNavbarTabs();
    return (
        <div className="grid grid-cols-5 justify-between gap-2 bg-white px-6 py-2 pb-8 border-t-1 border-gray">
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
