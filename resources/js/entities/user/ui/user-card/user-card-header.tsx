import { Badge } from '@/shared/ui/badge';
import { Title } from '@/shared/ui/title';
import { ReactNode } from 'react';

interface UserCardHeaderProps {
    userName: string;
    rightAddon: ReactNode;
}

export const UserCardHeader = (props: UserCardHeaderProps) => {
    const { userName, rightAddon } = props;
    return (
        <div className="flex items-center">
            <div
                className="h-9 w-9 rounded-full"
                style={{ background: 'linear-gradient(90deg, #7261FF 0%, #66A9E0 100%)' }}
            ></div>
            <div className="ml-2">
                <Title className="font-medium">{userName}</Title>
                <div className="flex gap-1">
                    <Badge>Новый</Badge>
                    <Badge>Premium</Badge>
                </div>
            </div>
            {rightAddon}
        </div>
    );
};
