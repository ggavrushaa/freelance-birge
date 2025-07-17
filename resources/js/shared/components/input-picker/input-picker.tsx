import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import Picker from 'react-mobile-picker';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../../ui/drawer';

interface DayPickerProps<T extends Record<string, (string | number)[]>> {
    name: string;
    value: string | number | null;
    setValue: (value: string) => void;
    selections: T;
    pickedValue: Record<keyof T, string | number>;
    renderTrigger: (value: (string | number) | null) => ReactNode;
    renderLabel: (value: string | number) => ReactNode;
}

export const InputPicker = <T extends Record<string, (string | number)[]>>({
    name,
    value,
    setValue,
    selections,
    pickedValue,
    renderTrigger,
    renderLabel,
}: DayPickerProps<T>) => {
    const [pickerValue, setPickerValue] = useState<Record<keyof T, string | number>>(pickedValue);

    const onChange = (value: Record<keyof T, string | number>) => {
        setPickerValue(value);
    };

    const columnKey = Object.keys(selections)[0];


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div>
                    {renderTrigger(value)}
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-4 flex items-center justify-between px-3 pt-2">
                        <DrawerClose className="title-4 !text-primary">Закрыть</DrawerClose>
                        <p className="title-3">{name}</p>
                        <DrawerClose
                            onClick={() => setValue(String(pickerValue[columnKey]))}
                            className="title-4 !text-primary"
                        >
                            Выбрать
                        </DrawerClose>
                    </div>
                    <div
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        className="pointer-events-auto"
                    >
                        <Picker
                            className="touch-action: none; overflow-y-auto [&>div:last-of-type]:bg-[rgba(118,118,128,0.12)]"
                            value={pickerValue}
                            onChange={onChange}
                        >
                            {Object.keys(selections).map((name) => (
                                <Picker.Column key={name} name={name}>
                                    {selections[name].map((option) => (
                                        <Picker.Item
                                            key={option}
                                            value={option}
                                            className={clsx('transition-colors duration-300')}
                                        >
                                            {renderLabel(option)}
                                        </Picker.Item>
                                    ))}
                                </Picker.Column>
                            ))}
                        </Picker>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
