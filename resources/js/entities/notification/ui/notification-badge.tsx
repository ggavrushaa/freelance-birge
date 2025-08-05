import { Text } from '@/shared/ui/text';
import classNames from 'classnames';

interface NotificationBadgeProps extends React.ComponentProps<'div'> {
    notificationsCount: number;
}

export const NotificationBadge = (props: NotificationBadgeProps) => {
    const { notificationsCount = 0 } = props;

    const notificationsCountText = notificationsCount < 100 ? notificationsCount : "99+";

    return (
        <div className={classNames('relative', props.className)}>
            <img src="/icons/notification.svg" />
            <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red flex items-center justify-center">
                <Text fontSize={8} fontColor="white" as="span" className='font-medium'>{notificationsCountText}</Text>
            </div>
        </div>
    );
};
