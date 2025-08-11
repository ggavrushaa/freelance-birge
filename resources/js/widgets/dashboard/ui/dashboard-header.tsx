import { NotificationBadge } from '@/entities/notification';
import { ROUTES } from '@/shared/config/routes';
import { useFocus } from '@/shared/hooks/use-focus';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Logo } from '@/shared/ui/logo';
import { router } from '@inertiajs/react';
import cls from 'classnames';
import { ChangeEvent } from 'react';

interface DashboardHeaderProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    onEnter: () => void;
}

export const DashboardHeader = (props: DashboardHeaderProps) => {
    const { searchQuery, setSearchQuery, onEnter } = props;
    const searchInput = useFocus();
     const {
        auth: { notifications },
    } = usePageProps();

    const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const handleClickNotificationBadge = () => {
        router.get(ROUTES.notifications);
    }

    return (
        <>
            <Logo className="mx-auto mb-7 h-12.5 w-28" />
            <div className="mb-4 grid grid-cols-[1fr_28px] items-center gap-3 px-6">
                <InputWithIcon
                    value={searchQuery}
                    placeholder="Поиск"
                    renderIcon={() => <img src="/icons/search.svg" alt="search" className="mr-3" />}
                    onChange={handleChangeSearchInput}
                    onFocus={searchInput.focus}
                    onBlur={searchInput.blur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onEnter();
                        }
                    }}
                    className={cls(
                        'flex-1 gap-0 rounded-xl py-1 pl-[34%] transition-all duration-300',
                        searchInput.isFocused && 'pl-3',
                    )}
                />
                <NotificationBadge onClick={handleClickNotificationBadge} notificationsCount={notifications.length} className="shrink-0" />
            </div>
        </>
    );
};
