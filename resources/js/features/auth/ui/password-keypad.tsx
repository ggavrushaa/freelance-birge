import clsx from 'clsx';

const keyPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

interface PasswordKeyPadProps {
    onDigitClick: (digit: number) => void;
    onClearClick: () => void;
}

export const PasswordKeyPad = (props: PasswordKeyPadProps) => {
    const { onDigitClick, onClearClick } = props;
    return (
        <div className="grid grid-cols-3 gap-6 [&>div:last-child]:col-3">
            {keyPad.map((num) => (
                <div
                    onClick={() => onDigitClick(num)}
                    key={num}
                    className={clsx(
                        'transition password-num flex h-14 w-14 items-center justify-center rounded-full bg-[#eeeeef] btn-press',
                        {
                            'col-2': num === 0,
                        },
                    )}
                >
                    {num}
                </div>
            ))}
            <div onClick={onClearClick} className="flex h-14 w-14 items-center justify-center btn-press">
                <img src="/icons/clear.svg" />
            </div>
        </div>
    );
};
