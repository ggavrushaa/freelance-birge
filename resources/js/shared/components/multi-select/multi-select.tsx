import { Badge } from '@/shared/ui/badge';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui/select';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';

const CloseIcon = ({ className }: { className: string }) => {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="7.5" cy="7.5" r="7" fill="#E6F2FF" stroke="white" />
            <path
                d="M10.476 5.19137C10.6601 5.00733 10.6601 4.70893 10.476 4.52488C10.292 4.34084 9.99359 4.34084 9.80955 4.52488L7.50046 6.83397L5.19137 4.52488C5.00733 4.34084 4.70893 4.34084 4.52488 4.52488C4.34084 4.70893 4.34084 5.00733 4.52488 5.19137L6.83397 7.50046L4.52488 9.80955C4.34084 9.99359 4.34084 10.292 4.52488 10.476C4.70893 10.6601 5.00733 10.6601 5.19137 10.476L7.50046 8.16695L9.80955 10.476C9.99359 10.6601 10.292 10.6601 10.476 10.476C10.6601 10.292 10.6601 9.99359 10.476 9.80955L8.16695 7.50046L10.476 5.19137Z"
                fill="#007AFF"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.80955 4.52488L7.50046 6.83397L5.19137 4.52488C5.00733 4.34084 4.70893 4.34084 4.52488 4.52488C4.34084 4.70893 4.34084 5.00733 4.52488 5.19137L6.83397 7.50046L4.52488 9.80955C4.34084 9.99359 4.34084 10.292 4.52488 10.476C4.70893 10.6601 5.00733 10.6601 5.19137 10.476L7.50046 8.16695L9.80955 10.476C9.99359 10.6601 10.292 10.6601 10.476 10.476C10.6601 10.292 10.6601 9.99359 10.476 9.80955L8.16695 7.50046L10.476 5.19137C10.6601 5.00733 10.6601 4.70893 10.476 4.52488C10.292 4.34084 9.99359 4.34084 9.80955 4.52488Z"
                fill="#007AFF"
            />
        </svg>
    );
};

interface MultiSelectProps<T> {
    items: T[];
    selectedItems: T[];
    onChange: (value: T) => void;
    onRemove: (value: T) => void;
    getLabel: (item: T) => string;
    getValue: (item: T) => string;
    renderSelectItem: (item: T) => ReactNode;
    placeholder?: string;
    className?: string;
}

export const MultiSelect = <T,>({
    items,
    selectedItems,
    onChange,
    onRemove,
    getLabel,
    getValue,
    renderSelectItem,
    placeholder = 'Select',
    className,
}: MultiSelectProps<T>) => {
    const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
    const [key, setKey] = useState(+new Date());

    const handleChange = (value: string) => {
        const foundItem = items.find((item) => getValue(item) === value);
        if (foundItem) {
            onChange(foundItem);
        }
        setSelectValue(undefined);
        setKey(+new Date());
    };

    return (
        <div
            className={classNames(
                'relative flex flex-wrap gap-1 rounded-xl bg-[#eeeeef] px-3 py-4',
                className,
            )}
        >
            {selectedItems.map((item) => (
                <div key={getValue(item)} className="relative w-fit">
                    <Badge>{getLabel(item)}</Badge>
                    <button
                        type="button"
                        onClick={() => onRemove(item)}
                        className="absolute top-[-3px] right-[-5px]"
                    >
                        <CloseIcon className="size-[15px]" />
                    </button>
                </div>
            ))}
            {items.length > 0 && (
                <Select key={key} value={selectValue} onValueChange={handleChange}>
                    <SelectTrigger
                        style={{ background: 'rgba(0, 122, 255, 0.1)', color: '#007aff' }}
                        withArrow={false}
                        className="h-fit w-fit px-2 py-[2px]"
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>{items.map((item) => renderSelectItem(item))}</SelectContent>
                </Select>
            )}
        </div>
    );
};
