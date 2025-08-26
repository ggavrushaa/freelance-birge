import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface OrderTabProps extends ComponentProps<'div'> {
    title: string;
    count: number | null;
    isActive: boolean;
}

export const OrderTab = (props: OrderTabProps) => {
    const { isActive, title, count, ...rest } = props;
    return (
        <div
            className={classNames('flex items-center justify-center gap-1 rounded-[8px] py-3', {
                'bg-primary': isActive,
            })}
            {...rest}
        >
            <Title
                fontSize={15}
                className={classNames('font-medium', {
                    'text-white': isActive,
                })}
            >
                {title}
            </Title>
            <Text
                fontColor="white"
                fontSize={9}
                className={classNames('w-fit rounded-[5px] bg-primary px-1.5 py-1 opacity-0', {
                    'opacity-100': count !== null,
                    'bg-white text-primary': isActive,
                })}
            >
                {count && count > 99 ? `99+` : count}
            </Text>
        </div>
    );
};
