import classNames from 'classnames';
import { ComponentProps } from 'react';

interface UserRateProps extends ComponentProps<'div'> {
    rating: number;
}

export const UserRate = (props: UserRateProps) => {
    const { rating, ...rest } = props;
    return (
        <div {...rest} className={classNames('flex items-center', props.className)}>
            <div className="mt-auto flex items-center">
                <img src="/icons/star2.svg" />
                <span className="text-14 font-medium">{rating}</span>
                <span className="text-8 ml-1 text-gray">(777)</span>
            </div>
        </div>
    );
};
