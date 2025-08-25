import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface OrderArchiveCardProps extends ComponentProps<'div'> {
    count: number | string;
}

export const OrderArchiveCard = (props: OrderArchiveCardProps) => {
    const { count,...rest } = props;
    return (
        <Card
            {...rest}
            className={classNames('relative flex flex-row items-center gap-0 p-4', props.className)}
        >
            <img src="/icons/archive.svg" className="max-w-9" />
            <div className="ml-4">
                <Title className="mb-1 font-medium">Архив</Title>
                <Text fontSize={13}>Все архивированные услуги</Text>
            </div>
            <Text
                fontColor="white"
                fontSize={9}
                className={classNames('w-fit rounded-[5px] bg-primary px-1.5 py-1 ml-auto self-baseline')}
            >
                {count}
            </Text>
        </Card>
    );
};
