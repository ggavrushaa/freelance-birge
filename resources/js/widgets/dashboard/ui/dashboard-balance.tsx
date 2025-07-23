import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

export const DashboardBalance = () => {
    return (
        <Card className="mx-6 mb-4 flex flex-row justify-between p-4">
            <div>
                <Text>Ваш баланс</Text>
                <Title fontSize={28} className="font-bold">
                    $14.765.423
                </Title>
            </div>
            <Badge className="flex h-fit items-center gap-1 px-2 py-1">
                <img src="/icons/wallet.svg" alt="wallet" />
                <Text fontSize={13}>Подробнее</Text>
            </Badge>
        </Card>
    );
};
