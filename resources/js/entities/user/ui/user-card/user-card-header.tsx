import { Badge } from '@/shared/ui/badge';
import { Title } from '@/shared/ui/title';

export const UserCardHeader = () => {
    return (
        <div className="flex items-center">
            <div
                className="h-9 w-9 rounded-full"
                style={{ background: 'linear-gradient(90deg, #7261FF 0%, #66A9E0 100%)' }}
            ></div>
            <div className="ml-2">
                <Title className='font-medium'>Andrew</Title>
                <div className="flex gap-1">
                    <Badge>Новый</Badge>
                    <Badge>Premium</Badge>
                </div>
            </div>
            <img src="/icons/arrow-right.svg" className="ml-auto" />
        </div>
    );
};
