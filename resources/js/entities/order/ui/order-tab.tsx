import { Text } from "@/shared/ui/text";
import { Title } from "@/shared/ui/title";
import classNames from "classnames";
import { ComponentProps } from "react";

interface OrderTabProps extends ComponentProps<'div'> {
    title: string;
    count: number;
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
                className={classNames("w-fit rounded-[5px] bg-primary px-1.5 py-1",{
                    "bg-white text-primary": isActive,
                })}
            >
                {count > 99 ? `99+` : count}
            </Text>
        </div>
    );
};