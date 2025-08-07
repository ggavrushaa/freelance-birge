import classNames from 'classnames';
import { ComponentProps, ReactNode } from 'react';
import { Notification } from '../model/types';

interface NotificationListProps extends ComponentProps<'div'> {
    header: ReactNode;
    notifications: Notification[];
    renderNotification: (notification: Notification) => ReactNode;
}

export const NotificationList = (props: NotificationListProps) => {
    const { header, notifications = [], renderNotification, ...rest } = props;

    if (notifications.length === 0) return null;

    return (
        <div {...rest} className={classNames('', props.className)}>
            {header}
            <div className="flex flex-col gap-2">
                {notifications.map((notification) => renderNotification(notification))}
            </div>
        </div>
    );
};
