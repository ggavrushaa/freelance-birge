interface InputPickerTriggerProps {
    name: string;
    value: (string | number) | null;
}
export const InputPickerTrigger = (props: InputPickerTriggerProps) => {
    const { name, value } = props;
    return (
        <div className="input-bg flex max-w-[110px] items-center gap-2 rounded-[10px] border px-4 py-2">
            <span className="text-xs text-[#242424] shrink-0">{name}</span>
            <input className="text-[11px]" value={value || ''} type="text" placeholder="Выбрать" disabled />
        </div>
    );
};
