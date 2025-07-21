import classNames from 'classnames';

interface InputPickerTriggerProps {
    name: string;
    value: (string | number) | null;
    className?: string;
}
export const InputPickerTrigger = (props: InputPickerTriggerProps) => {
    const { name, value } = props;
    return (
        <div
            className={classNames(
                'input-bg flex max-w-[110px] items-center gap-2 rounded-[10px] border px-4 py-2',
                props.className,
            )}
        >
            <span className="shrink-0 text-xs text-[#242424]">{name}</span>
            <input
                className="text-[11px]"
                value={value || ''}
                type="text"
                placeholder="Выбрать"
                disabled
            />
        </div>
    );
};
