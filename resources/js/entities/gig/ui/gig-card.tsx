import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface GigCardProps {
    title: string;
    isPremium: boolean;
    description: string;
    price: string;
    createdAt: string;
}

export const GigCard = (props: GigCardProps) => {
    const { title, isPremium } = props;
    return (
        <Card className="relative gap-0 overflow-hidden rounded-xl p-0 py-3 px-4">
            <div className='flex flex-row gap-2 mb-1.5'>
                <Title fontSize={17} className='font-medium'>
                    {title}
                </Title>
                {isPremium && <Badge>Premium</Badge>}
            </div>
            <div className='flex justify-between'>
                <Text fontSize={11} className='max-w-[196px]'>
                    Cделал топовое оформление для моего канала услуг, учел все мои пожелания,
                    вытерпел все мои капризы...
                </Text>
                <div className='flex items-end gap-1.5'>
                    <Text fontSize={11} className='shrink-0 self-end'>3 дня</Text>
                    <p>US$35</p>
                </div>
            </div>
        </Card>
    );
};
