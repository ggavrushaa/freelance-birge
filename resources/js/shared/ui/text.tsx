import classNames from 'classnames';

type AllowedText = 'p' | 'span';
type fontSize = 11 | 12 | 13 | 15 | 17 | 21 | 24;
type FontColor = 'gray' | 'primary' | 'black';

type TextProps<E extends AllowedText = 'p'> = {
    as?: E;
    fontSize?: fontSize;
    fontColor?: FontColor;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function Text<E extends AllowedText = 'p'>({
    as,
    fontSize = 17,
    fontColor = 'gray',
    children,
    className,
    ...rest
}: TextProps<E>) {
    const Component = as || 'p';

    const fontSizeClass = {
        11: 'text-[11px]',
        12: 'text-[12px]',
        13: 'text-[13px]',
        15: 'text-[15px]',
        17: 'text-[17px]',
        21: 'text-[21px]',
        24: 'text-[24px]',
    }[fontSize];

    const fontColorClass = {
        gray: 'text-gray',
        primary: 'text-primary',
        black: 'text-[#242424]',
    }[fontColor];

    return (
        <Component
            className={classNames('letter-spacing', fontSizeClass, fontColorClass, className)}
            {...rest}
        >
            {children}
        </Component>
    );
}
