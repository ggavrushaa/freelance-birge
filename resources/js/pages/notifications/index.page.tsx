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
import { ReactNode } from 'react';

type NotificationsIndexPageProps = SharedData & {
    notifications: Notification[];
};

const NotificationsIndexPage = (props: NotificationsIndexPageProps) => {
    const { notifications } = props;
    const groupedNotifications = groupNotificationsByDate(notifications);
    return (
        <section className="flex-1 bg-[#efeff4] px-6 pt-25">
            <div className="mb-8 flex items-end justify-between">
                <Title fontSize={28} className="font-medium">
                    Уведомления
                </Title>
                <Text fontColor="primary">Очистить</Text>
            </div>
            <div className="flex flex-col gap-2">
                {groupedNotifications.map((notificationGroup) => (
                    <NotificationList
                        header={
                            <Text fontSize={20} className="mb-3 font-medium">
                                {notificationGroup.label}
                            </Text>
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
