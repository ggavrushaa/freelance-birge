import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { ReviewCard } from './review-card';

export const ReviewList = (props: ComponentProps<'div'>) => {
    return (
        <div className={classNames('', props.className)}>
            <div className="mb-3 flex items-center justify-between">
                <Title className="font-medium">Отзывы</Title>
                <Text className="font-medium">Все</Text>
            </div>
            <div className="scrollbar-hide flex flex-row gap-2 overflow-auto">
                <ReviewCard className="min-w-[276px]" />
                <ReviewCard className="min-w-[276px]" />
                <ReviewCard className="min-w-[276px]" />
            </div>
        </div>
    );
};
