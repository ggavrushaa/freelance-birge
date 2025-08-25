import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps, ReactNode } from 'react';

interface OrderCardProps extends ComponentProps<'div'> {
    title: string;
    status: string;
    terms: number;
    price: number;
    count: number | null;
    icon: ReactNode;
}

export const OrderCard = (props: OrderCardProps) => {
    const { title, status, terms, price, count, icon } = props;
    return (
        <Card className="relative flex flex-row items-center gap-0 p-4">
            {icon}
            <div className="ml-4">
                <Title className="mb-1 font-medium">{title}</Title>
                <Text fontSize={13}>{status}</Text>
            </div>
            <div className="ml-auto flex flex-col items-end justify-between gap-1.5">
                <Text fontColor="primary" fontSize={13} className="font-medium">
                    {terms} дней
                </Text>
                <Text fontSize={13}>{price} USD</Text>
            </div>
            <div
                className={classNames(
                    'absolute top-[-7px] right-[-7px] flex h-4 w-4 items-center justify-center rounded-full bg-red opacity-0',
                    {
                        "opacity-100": count !== null,
                    }
                )}
            >
                <Text fontSize={8} fontColor="white" as="span" className="font-medium">
                    {count}
                </Text>
            </div>
        </Card>
    );
};
