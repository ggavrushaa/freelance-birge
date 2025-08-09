import { LikeIcon } from '@/entities/job/icons/like';
import { UserRate } from '@/entities/user';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface GigSimilarCardProps extends ComponentProps<'div'> {
    rating: number;
    title: string;
    price: number;
}

export const GigSimilarCard = (props: GigSimilarCardProps) => {
    const { rating, title, ...rest } = props;
    return (
        <Card {...rest} className={classNames('gap-0 rounded-xl p-0 overflow-hidden', props.className)}>
            <img src="/images/photo-404.png" className="max-h-[74px] object-cover" />
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <UserRate
                        rating={rating}
                        className="[&>div>span:first-of-type]:text-[15px] [&>div>span:last-of-type]:text-[11px]"
                    />
                    <LikeIcon className="" />
                </div>
                <Title className='font-medium line-clamp-2'>{title}</Title>
                <div className='flex items-end gap-1 justify-end'>
                    <Text>от</Text>
                    <Title>US$35</Title>
                </div>
            </div>
        </Card>
    );
};
