import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { useState } from 'react';

interface TariffAdditionalsModalProps {
    options: string[];
    choosenIds: number[];
    onSave: (options: string[]) => void;
}

export const TariffAdditionalsModal = (props: TariffAdditionalsModalProps) => {
    const { options, onSave, choosenIds } = props;
    const [choosenOptionIds, setChoosenOptionIds] = useState<number[]>(choosenIds);

    const renderOptionIcon = (id: number) => {
        if (choosenOptionIds.includes(id)) {
            return <img src="/icons/checked.svg" alt="" />;
        }
        return <img src="/icons/unchecked.svg" alt="" />;
    };

    const resetChoosenOptionIds = () => {
        setChoosenOptionIds([]);
    };

    const handleClickOption = (id: number) => {
        if (choosenOptionIds.includes(id)) {
            setChoosenOptionIds((prev) => prev.filter((i) => i !== id));
        } else {
            setChoosenOptionIds((prev) => [...prev, id]);
        }
    };

    const handleSave = () => {
        const selectedOptions = choosenOptionIds.map((id) => options[id]);
        onSave(selectedOptions);
    };

    return (
        <div className="bg-main fixed top-0 left-0 flex min-h-[100svh] w-full flex-col px-6 pt-22 pb-12">
            <Title fontSize={20} className="mb-8 text-center font-bold">
                Разработка и IT
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

            <Card className="gap-0 px-4 py-0">
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleClickOption(index)}
                        className="flex cursor-pointer items-center gap-4"
                    >
                        {renderOptionIcon(index)}
                        <div className="flex-1 border-b-[0.33px] border-gray py-2.5">
                            <Text className="max-w-[174px]" fontSize={15}>
                                {option}
                            </Text>
                        </div>
                    </div>
                ))}
            </Card>

            <Button
                onClick={handleSave}
                disabled={choosenOptionIds.length === 0}
                className="mt-auto w-full"
            >
                Сохранить
            </Button>
        </div>
    );
};
