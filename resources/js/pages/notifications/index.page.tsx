import {
    formatNotificationDate,
    Notification,
    NotificationCard,
    NotificationList,
} from '@/entities/notification';
import { groupNotificationsByDate } from '@/entities/notification/model/utils/group-notifications-by-date';
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
        router.patch('notifications/mark-all-read');
    };

    return (
        <section className="flex-1 bg-[#efeff4] px-6 pt-25 pb-6">
            <div className="mb-8 flex items-end justify-between">
                <Title fontSize={28} className="font-medium">
                    Уведомления
                </Title>
                <Text fontColor="primary" onClick={handleClickClear}>
                    Очистить
                </Text>
            </div>
            <div className="flex flex-col gap-2">
                {groupedNotifications.map((notificationGroup) => (
                    <NotificationList
                        header={
                            <div className='flex items-center gap-2 mb-3'>
                                <Text fontSize={20} className="font-medium">
                                    {notificationGroup.label}
                                </Text>
                                <span className='bg-primary w-4.5 h-4.5 rounded-[5px] text-[9px] flex items-center justify-center text-[#fff]'>{notificationGroup.items.length}</span>
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
