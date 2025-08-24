import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

export const OrderCard = () => {
    return (
        <Card className="relative flex flex-row items-center gap-0 p-4">
            <img src="/icons/order/1.svg" className="max-w-7" />
            <div className="ml-4">
                <Title className="mb-1 font-medium">Monaco create Logo</Title>
                <Text fontSize={13}>Проект опубликован</Text>
            </div>
            <div className="ml-auto flex flex-col items-end justify-between gap-1.5">
                <Text fontColor="primary" fontSize={13} className="font-medium">
                    30 дней
                </Text>
                <Text fontSize={13}>135 USD</Text>
            </div>
            <div className="absolute top-[-7px] right-[-7px] flex h-4 w-4 items-center justify-center rounded-full bg-red">
                <Text fontSize={8} fontColor="white" as="span" className="font-medium">
                    {0}
                </Text>
            </div>
        </Card>
    );
};
