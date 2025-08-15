import classNames from 'classnames';
import clsx from 'clsx';

const keyPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

interface PasswordKeyPadProps {
    disabled: boolean;
    onDigitClick: (digit: number) => void;
    onClearClick: () => void;
}

export const PasswordKeyPad = (props: PasswordKeyPadProps) => {
    const { disabled, onDigitClick, onClearClick } = props;

    const handleDigitClick = (num: number) => {
        if (disabled) return;
        onDigitClick(num);
    };

    const handleClearClick = () => {
        if (disabled) return;
        onClearClick();
    };

    return (
        <div
            className={classNames('grid grid-cols-3 gap-6 [&>div:last-child]:col-3', {
                'opacity-50': disabled,
            })}
        >
            {keyPad.map((num) => (
                <div
                    onClick={() => handleDigitClick(num)}
                    key={num}
                    className={clsx(
                        'password-num btn-press flex h-14 w-14 items-center justify-center rounded-full bg-[#eeeeef] transition',
                        {
                            'col-2': num === 0,
                        },
                    )}
                >
                    {num}
                </div>
            ))}
            <div
                onClick={handleClearClick}
                className="btn-press flex h-14 w-14 items-center justify-center"
            >
                <img src="/icons/clear.svg" />
            </div>
        </div>
    );
};
