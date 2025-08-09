import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface JobSimilarCard extends ComponentProps<'div'> {
    title: string;
    price: number;
    isPremium: boolean;
    categoryLable?: string;
}

export const JobSimilarCard = (props: JobSimilarCard) => {
    const { title, price, isPremium, categoryLable } = props;
    return (
        <Card className={classNames('gap-0 p-3', props.className)}>
            <div className="mb-3 flex gap-6">
                <Title className="flex-1 font-medium">{title}</Title>
                <div className="flex flex-col items-end">
                    <Text fontColor="primary" className="font-medium">
                        US${price}
                    </Text>
                    <Title fontSize={13}>5 дней</Title>
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div className="flex gap-1">
                    {isPremium && <Badge variant="violet">Premium</Badge>}
                    {categoryLable && <Badge>{categoryLable}</Badge>}
                </div>
                <Text fontSize={13}>1 час назад</Text>
            </div>
        </Card>
    );
};
