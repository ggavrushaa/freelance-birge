import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { AdditionalOption } from '@/types';
import { useState } from 'react';
import { TariffAdditionalsList } from './tariff-additionals-list';

interface TariffAdditionalsModalProps {
    categoryName: string;
    additionalOptions: AdditionalOption[];
    choosenOptions: AdditionalOption[];
    onSave: (options: AdditionalOption[]) => void;
}

export const TariffAdditionals = (props: TariffAdditionalsModalProps) => {
    const { categoryName, onSave, choosenOptions, additionalOptions } = props;
    const [choosenOptionValues, setChoosenOptionValues] =
        useState<AdditionalOption[]>(choosenOptions);

    const resetChoosenOptionIds = () => {
        setChoosenOptionValues([]);
    };

    const handleClickOption = (option: AdditionalOption) => {
        const isExistOption = choosenOptionValues.find(
            (choosenOptionValue) => choosenOptionValue.value === option.value,
        );

        if (isExistOption) {
            setChoosenOptionValues((prev) => prev.filter((i) => i.value !== option.value));
        } else {
            setChoosenOptionValues((prev) => [...prev, option]);
        }
    };

    const handleSave = () => {
        onSave(choosenOptionValues);
    };
    return (
        <>
            <Title fontSize={20} className="mb-8 text-center font-bold">
                {categoryName}
            </Title>

            <div className="mb-3 flex items-center justify-between">
                <Title fontSize={20} className="font-bold">
                    Дополнения (опционально)
                </Title>
                <Text
                    fontColor="primary"
                    onClick={resetChoosenOptionIds}
                    className="cursor-pointer"
                >
                    Очистить
                </Text>
            </div>

            <TariffAdditionalsList
                additionalOptions={additionalOptions}
                choosenOptionValues={choosenOptionValues}
                onClickOption={handleClickOption}
            />

            <Button
                onClick={handleSave}
                disabled={choosenOptionValues.length === 0}
                className="mt-auto w-full"
            >
                Сохранить
            </Button>
        </>
    );
};
