import classNames from 'classnames';

type AllowedText = 'p' | 'span';
type fontSize = 12 |  13 | 17 | 21;

type TextProps<E extends AllowedText = 'p'> = {
    as?: E;
    fontSize?: fontSize;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function Text<E extends AllowedText = 'p'>({
    as,
    fontSize = 17,
    children,
    className,
    ...rest
}: TextProps<E>) {
    const Component = as || 'p';

    const fontSizeClass = {
        12: 'text-[12px]',
        13: 'text-[13px]',
        17: 'text-[17px]',
        21: 'text-[21px]',
    }[fontSize];

    return (
        <Component
            className={classNames('letter-spacing text-gray', fontSizeClass, className)}
            {...rest}
        >
            {children}
        </Component>
    );
}
