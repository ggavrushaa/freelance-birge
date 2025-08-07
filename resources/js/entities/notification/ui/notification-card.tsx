import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';

interface NotificationCardProps extends React.ComponentProps<'div'> {
    title: string;
    description: string;
    timeText: string;
}

export const NotificationCard = (props: NotificationCardProps) => {
    const { title, description, timeText, ...rest } = props;
    return (
        <Card
            {...rest}
            className={classNames('flex-row justify-between gap-0 p-4', props.className)}
        >
            <div className="max-w-[70%]">
                <Title className="font-medium">{title}</Title>
                <Text fontSize={13}>{description}</Text>
            </div>
            <div className="flex flex-col items-end justify-between">
                <Text fontSize={11} className="mt-1 font-medium">
                    {timeText}
                </Text>
                <Badge className="btn-press">Смотреть</Badge>
            </div>
        </Card>
    );
};
