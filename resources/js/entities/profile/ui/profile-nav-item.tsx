import { Text } from '@/shared/ui/text';
import { ReactNode } from 'react';

interface ProfileNavItemProps {
    imageUrl: string;
    text: string;
    rightAddon?: ReactNode;
}

export const ProfileNavItem = (props: ProfileNavItemProps) => {
    const { imageUrl, text, rightAddon } = props;
    return (
        <div className="flex items-center border-b border-profile py-1.5">
            <img src={imageUrl} />
            <Text fontColor="black" className="ml-3">
                {text}
            </Text>
            {rightAddon}
        </div>
    );
};
