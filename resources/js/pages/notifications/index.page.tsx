import {
    formatNotificationDate,
    Notification,
    NotificationCard,
    NotificationList,
} from '@/entities/notification';
import { groupNotificationsByDate } from '@/entities/notification';
import { NotificationClearButton } from '@/features/notification/clear-notification';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

type NotificationsIndexPageProps = SharedData & {
    notifications: Notification[];
};

const NotificationsIndexPage = (props: NotificationsIndexPageProps) => {
    const { notifications } = props;
    const groupedNotifications = groupNotificationsByDate(notifications);

    const handleClickClear = () => {
        router.patch(`${ROUTES.notificationsMarkAllRead}`);
    };

    return (
        <section className="flex-1 bg-[#efeff4] px-6 pt-25 pb-6">
            <div className="mb-8 flex items-end justify-between">
                <Title fontSize={28} className="font-medium">
                    Уведомления
                </Title>
                <NotificationClearButton onClear={handleClickClear} />
            </div>
            <div className="flex flex-col gap-2">
                {groupedNotifications.map((notificationGroup) => (
                    <NotificationList
                        header={
                            <div className="mb-3 flex items-center gap-2">
                                <Text fontSize={20} className="font-medium">
                                    {notificationGroup.label}
                                </Text>
                                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-[5px] bg-primary text-[9px] text-[#fff]">
                                    {notificationGroup.items.length}
                                </span>
                            </div>
                        }
                        notifications={notificationGroup.items}
                        renderNotification={(notification) => (
                            <NotificationCard
                                title={notification.title}
                                description={notification.description}
                                timeText={formatNotificationDate(notification.created_at)}
                            />
                        )}
                    />
                ))}
            </div>
        </section>
    );
};

NotificationsIndexPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default NotificationsIndexPage;
