import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface UserCardHeaderProps {
    userName: string;
    badges: ReactNode;
    rightAddon?: ReactNode;
    className?: string;
}

export const UserCardHeader = (props: UserCardHeaderProps) => {
    const { userName, rightAddon, badges } = props;
    return (
        <div className={classNames('flex items-center', props.className)}>
            <div
                className="h-9 w-9 rounded-full"
                style={{ background: 'linear-gradient(90deg, #7261FF 0%, #66A9E0 100%)' }}
            ></div>
            <div className="ml-2">
                <Title className="font-medium">{userName}</Title>
                <div className="flex gap-1">
                    {badges}
                </div>
            </div>
            {rightAddon}
        </div>
    );
};
