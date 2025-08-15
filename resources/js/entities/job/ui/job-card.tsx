import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { User } from '@/types';
import { LikeIcon } from '../icons/like';

interface JobCardProps {
    imageUrl: string | null;
    title: string;
    price: string;
    freelancer: User;
}

export const JobCard = (props: JobCardProps) => {
    const { imageUrl, title, price, freelancer } = props;
    const image = imageUrl ? imageUrl : '/images/photo-404.png';
    return (
        <Card className="relative flex h-28 flex-row gap-3 overflow-hidden rounded-xl p-0">
            <img src={image} className="h-full w-30 object-cover" />
            <div className="flex flex-1 flex-col pt-3 pr-4 pb-1">
                <div className="flex items-center">
                    <img src="/icons/star2.svg" />
                    <span className="text-14 font-medium">{freelancer.rating}</span>
                    <span className="mt-1 ml-1 text-gray">(777)</span>
                </div>
                <Text fontSize={15} fontColor="black">
                    {title}
                </Text>
                <div className="mt-auto ml-auto">
                    <Text fontSize={11} as={'span'}>
                        От
                    </Text>
                    &nbsp;
                    <Text fontColor="black" fontSize={15} as={'span'} className="font-medium">
                        US${price}
                    </Text>
                </div>
                <LikeIcon className="absolute top-3 right-4" />
            </div>
        </Card>
    );
};
