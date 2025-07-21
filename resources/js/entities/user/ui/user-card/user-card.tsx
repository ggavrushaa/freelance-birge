import { Card } from '@/shared/ui/card';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface UserCardProps {
    header: ReactNode;
    content: ReactNode;
    className?: string;
}

export const UserCard = (props: UserCardProps) => {
    const { header, content } = props;
    return (
        <Card className={classNames('gap-4 rounded-xl p-4', props.className)}>
            {header}
            {content}
        </Card>
    );
};
