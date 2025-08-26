import { Avatar } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { User } from '@/types';
import classNames from 'classnames';
import { ComponentProps, ReactNode } from 'react';

interface UserPreviewCardProps extends ComponentProps<'div'> {
    user: User;
    rightAddon: ReactNode | null;
}

export const UserPreviewCard = (props: UserPreviewCardProps) => {
    const { user, rightAddon, ...rest } = props;
    return (
        <Card {...rest} className={classNames("flex flex-row items-center gap-0 px-4 py-3",props.className)}>
            <Avatar className="bg-avatar mr-2.5 h-10 w-10 rounded-full"></Avatar>
            <div className="flex flex-col">
                <div className="mb-[2px] flex items-center">
                    <p className="mr-2.5">{user.username}</p>
                    <img src="/icons/star2.svg" />
                    <span className="text-14 font-medium">{user.rating}</span>
                    <span className="text-8 mt-1 ml-1 text-gray">(777)</span>
                </div>
                <div className="flex items-center gap-1">
                    <Badge>Premium</Badge>
                    <Badge>Top Ratted</Badge>
                </div>
            </div>
            {rightAddon}
        </Card>
    );
};
