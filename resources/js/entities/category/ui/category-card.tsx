import classNames from 'classnames';
import { ComponentProps } from 'react';

interface CategoryCardProps extends ComponentProps<'div'> {
    name: string;
    imageUrl: string;
    color: string;
}
export const CategoryCard = (props: CategoryCardProps) => {
    const { name, imageUrl, color, ...rest } = props;
    return (
        <div
            style={{ background: color }}
            className={classNames('flex flex-col', props.className)}
            {...rest}
        >
            <img src={imageUrl} alt={name} className="mb-1 max-w-11" />
            <p className="mt-auto text-[13px] font-bold text-white">{name}</p>
        </div>
    );
};
