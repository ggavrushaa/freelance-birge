import { useState } from 'react';
import { Text } from '@/shared/ui/text';
import { ChatIcon, CreateIcon, HomeIcon, OrderIcon, ProfileIcon } from '../icons';

const tabs = [
    { key: 'home', label: 'Главная', Icon: HomeIcon },
    { key: 'chat', label: 'Чат', Icon: ChatIcon },
    { key: 'create', label: 'Создать', Icon: CreateIcon },
    { key: 'order', label: 'Заказы', Icon: OrderIcon },
    { key: 'profile', label: 'Профиль', Icon: ProfileIcon },
];

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'create' | 'order' | 'profile'>('home');
  return (
    <div className="py-2 grid grid-cols-5 gap-2 justify-between bg-white rounded-xl px-6 pb-8">
      {tabs.map(({ key, label, Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className="flex flex-col items-center"
          >
            <Icon
              stroke={isActive ? '#007aff' : '#ADB3BC'}
              fill={isActive ? '#007aff' : '#ADB3BC'}
            />
            <Text fontSize={12} className={isActive ? 'text-primary!' : ''}>
              {label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};
