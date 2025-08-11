import { NotificationBadge } from '@/entities/notification';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Logo } from '@/shared/ui/logo';
import { router } from '@inertiajs/react';
import cls from 'classnames';

export const DashboardHeader = () => {
    const {
        auth: { notifications },
    } = usePageProps();

    const handleClickNotificationBadge = () => {
        router.get(ROUTES.notifications);
    };

    const handleClickInput = () => {
        router.get(ROUTES.search);
    };

    return (
        <>
            <Logo className="mx-auto mb-7 h-12.5 w-28" />
            <div className="mb-4 grid grid-cols-[1fr_28px] items-center gap-3 px-6">
                <InputWithIcon
                    placeholder="Поиск"
                    renderIcon={() => <img src="/icons/search.svg" alt="search" className="mr-3" />}
                    onClick={handleClickInput}
                    className={cls(
                        'flex-1 gap-0 rounded-xl py-2 pl-[34%] transition-all duration-300',
                    )}
                />
                <NotificationBadge
                    onClick={handleClickNotificationBadge}
                    notificationsCount={notifications.length}
                    className="shrink-0"
                />
            </div>
        </>
    );
};
