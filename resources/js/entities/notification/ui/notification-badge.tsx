import { Text } from '@/shared/ui/text';
import classNames from 'classnames';

interface NotificationBadgeProps extends React.ComponentProps<'div'> {
    notificationsCount: number;
}

export const NotificationBadge = (props: NotificationBadgeProps) => {
    const { notificationsCount = 0, ...rest } = props;
    const notificationsCountText = notificationsCount < 100 ? notificationsCount : '99+';
    return (
        <div {...rest} className={classNames('relative', props.className)}>
            <img src="/icons/notification.svg" />
            {notificationsCount > 0 && (
                <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red">
                    <Text fontSize={8} fontColor="white" as="span" className="font-medium">
                        {notificationsCountText}
                    </Text>
                </div>
            )}
        </div>
    );
};
