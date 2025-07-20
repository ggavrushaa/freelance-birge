import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { useState } from 'react';
import { Tariff } from '../model/types';

interface TariffListProps {
    tariffs: Tariff[];
    onClick: (id: number) => void;
    onAdd: () => void;
    onRemove: () => void;
}

export const TariffList = (props: TariffListProps) => {
    const { tariffs, onClick, onAdd, onRemove } = props;
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => {
        if (tariffs.length === 0) return;
        setIsEdit((prev) => !prev);
    };

    const handleClick = (id:number) => {
        if (isEdit) return;
        onClick(id);
    };

    return (
        <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
                <Title fontSize={20} className="font-bold">
                    Услуги
                </Title>
                <Text onClick={toggleIsEdit} as="span" fontColor="primary">
                    Изм.
                </Text>
            </div>
            <Card className="gap-0 px-4 py-3">
                {tariffs.map((tariff, index) => (
                    <div
                        onClick={() => handleClick(tariff.id!)}
                        key={index}
                        className={classNames(
                            'flex items-center justify-between border-b border-gray pb-2.5',
                            index === 0 ? 'pt-0' : 'pt-2.5',
                        )}
                    >
                        <Text fontColor="black" className="font-medium">
                            Услуга&nbsp; {index + 1}
                        </Text>
                        {isEdit ? (
                            <img
                                onClick={() => onRemove()}
                                className="h-4.5 w-4.5"
                                src="/icons/close-gray.svg"
                            />
                        ) : (
                            <img className="h-4.5 w-4.5" src="/icons/arrow-right.svg" />
                        )}
                    </div>
                ))}
                <div
                    onClick={() => onAdd()}
                    className={classNames(
                        'flex items-center gap-2.5',
                        tariffs.length === 0 ? 'pt-0' : 'pt-2.5',
                    )}
                >
                    <img src="/icons/plus-gray.svg" />
                    <Text className="font-medium">Услуга {tariffs.length + 1}</Text>
                </div>
            </Card>
        </div>
    );
};
