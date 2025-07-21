import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface UserCardContentProps {
    ordersCount: number;
    completedOrdersCount: number;
}

export const UserCardContent = (props: UserCardContentProps) => {
    const { ordersCount, completedOrdersCount } = props;
    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <Title className="font-medium">Заказов</Title>
                    <Text className="font-medium">{ordersCount}</Text>
                </div>
                <div className="flex justify-between">
                    <Title className="font-medium">Выполнено</Title>
                    <Text className="font-medium">{completedOrdersCount}</Text>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="mt-auto flex items-center">
                    <img src="/icons/star2.svg" />
                    <span className="text-14 font-medium">4.9</span>
                    <span className="text-8 mt-1 ml-1 text-gray">(777)</span>
                </div>
            </div>
        </div>
    );
};
