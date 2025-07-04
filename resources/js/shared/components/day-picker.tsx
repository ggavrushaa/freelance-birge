import clsx from 'clsx';
import { useState } from 'react';
import Picker from 'react-mobile-picker';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { getDayLabel } from '../utils/get-day-label';

interface DayPickerProps<T extends Record<string, (string | number)[]>> {
    value: string | null;
    setValue: (value: string) => void;
    selections: T;
    pickedValue: Record<keyof T, string | number>;
}

export const DayPicker = <T extends Record<string, (string | number)[]>>({
    value,
    setValue,
    selections,
    pickedValue,
}: DayPickerProps<T>) => {
    const [pickerValue, setPickerValue] = useState<Record<keyof T, string | number>>(pickedValue);

    const onChange = (value: Record<keyof T, string | number>) => {
        setPickerValue(value);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="input-bg flex max-w-[110px] items-center gap-2 rounded-[10px] border px-4 py-2.5">
                    <span className="text-xs text-[#242424]">Дни</span>
                    <input value={value || ""} type="text" placeholder="Выбрать" disabled />
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <div className="mb-4 flex items-center justify-between px-3 pt-2">
                        <DrawerClose className="title-4 !text-primary">Закрыть</DrawerClose>
                        <p className="title-3">Срок</p>
                        <DrawerClose onClick={() => setValue(String(pickerValue.days))} className="title-4 !text-primary">Выбрать</DrawerClose>
                    </div>
                    <Picker value={pickerValue} onChange={onChange}>
                        {Object.keys(selections).map((name) => (
                            <Picker.Column key={name} name={name}>
                                {selections[name].map((option) => (
                                    <Picker.Item
                                        key={option}
                                        value={option}
                                        className={clsx(
                                            'transition-colors duration-300',
                                            option === pickerValue[name] && 'bg-1',
                                        )}
                                    >
                                        {getDayLabel(option as number)}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                        ))}
                    </Picker>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
