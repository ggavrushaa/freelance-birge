import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { formatTime } from '@/shared/utils/format-time';

interface DashboardOrderProps {
    imageUrl: string;
    name: string;
    status: string;
    createdAt: string;
}
export const DashboardOrder = (props: DashboardOrderProps) => {
    const { imageUrl, name, status, createdAt } = props;
    return (
        <div className="flex border-b border-gray pb-3">
            <img className="mr-4" src={imageUrl} />
            <div>
                <Title className="font-medium text-primary">{name}</Title>
                <Text fontSize={13} className="font-medium text-gray">
                    {status}
                </Text>
            </div>
            <Text fontSize={13} as="span" className="ml-auto font-medium text-gray">
                {formatTime(createdAt)}
            </Text>
        </div>
    );
};
