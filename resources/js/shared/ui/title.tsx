import classNames from 'classnames';

type AllowedHeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type fontSize = 13 |  15 | 17 | 19 | 20 | 21 | 24 | 28 | 34;

type TitleProps<E extends AllowedHeading = 'h3'> = {
    as?: E;
    fontSize?: fontSize;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function Title<E extends AllowedHeading = 'h3'>({
    as,
    fontSize = 17,
    children,
    className,
    ...rest
}: TitleProps<E>) {
    const Component = as || 'h3';

    const fontSizeClass = {
        13: 'text-[13px]',
        15: 'text-[15px]',
        17: 'text-[17px]',
        19: 'text-[19px]',
        20: 'text-[20px]',
        21: 'text-[21px]',
        24: 'text-[24px]',
        28: 'text-[28px]',
        34: 'text-[34px]',
    }[fontSize];

    return (
        <Component
            className={classNames('letter-spacing text-[#242424]', fontSizeClass, className)}
            {...rest}
        >
            {children}
        </Component>
    );
}
