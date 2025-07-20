import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { useState } from 'react';
import { Portal } from 'vaul';

const options = [
    'Написание документации к коду',
    'Интеграция платежей',
    'Добавить комментарии в коде',
    'Тестирование и багфиксинг',
    'Установка проета на сервер',
    'Срочное выполнение (ускоренный срок)',
];

export const TariffAdditionalsModal = () => {
    const [choosenOptionId, setChoosenOptionId] = useState<number | null>(null);

    const resetChoosenOptionId = () => {
        setChoosenOptionId(null);
    };

    const handleClickOption = (id: number) => {
        if (choosenOptionId === id) {
            resetChoosenOptionId();
            return;
        }
        setChoosenOptionId(id);
    };

    const renderOptionIcon = (id: number) => {
        if (choosenOptionId === id) {
            return <img src="/icons/checked.svg" alt="" />;
        }
        return <img src="/icons/unchecked.svg" alt="" />;
    };

    return (
        <Portal>
            <div className="bg-main fixed top-0 left-0 flex min-h-[100svh] w-full flex-col px-6 pt-22 pb-12">
                <Title fontSize={20} className="mb-8 text-center font-bold">
                    Разработка и IT
                </Title>
                <div className="mb-3 flex items-center justify-between">
                    <Title fontSize={20} className="font-bold">
                        Дополнения (опционально)
                    </Title>
                    <Text fontColor="primary" onClick={resetChoosenOptionId}>
                        Очистить
                    </Text>
                </div>
                <Card className="gap-0 px-4 py-0">
                    {options.map((option, index) => (
                        <div
                            onClick={() => handleClickOption(index)}
                            className="flex items-center gap-4"
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
                <Button disabled={!choosenOptionId} className="mt-auto w-full">
                    Сохранить
                </Button>
            </div>
        </Portal>
    );
};
