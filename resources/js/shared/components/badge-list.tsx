import classNames from 'classnames';
import { ReactNode } from 'react';
import { Badge } from '../ui/badge';

interface BadgeListProps<T> {
    items: T[];
    getItemLabel: (item: T) => string;
    leftIcon?: ReactNode;
    className?: string;
}

export const BadgeList = <T,>(props: BadgeListProps<T>) => {
    const { items, leftIcon, getItemLabel } = props;
    return (
        <div className={classNames('flex flex-row flex-wrap gap-1', props.className)}>
            {leftIcon}
            {items.map((item, index) => (
                <Badge key={index}>{getItemLabel(item)}</Badge>
            ))}
        </div>
    );
};
