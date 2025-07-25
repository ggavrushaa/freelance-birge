import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import classNames from 'classnames';
import { ComponentProps, ReactNode } from 'react';

interface JobFiltersItemProps extends ComponentProps<'div'> {
    text: string;
    icon?: ReactNode;
}

export const JobFiltersItem = (props: JobFiltersItemProps) => {
    const { text, icon = null, ...rest } = props;
    return (
        <Card
            {...rest}
            className={classNames('w-fit flex-row items-center gap-1 px-3 py-2', props.className)}
        >
            {icon}
            <Text fontSize={15} fontColor="black">
                {text}
            </Text>
        </Card>
    );
};
