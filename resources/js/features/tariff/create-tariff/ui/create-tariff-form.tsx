import { Tariff } from '@/entities/tariff/model/types';
import { InputPicker } from '@/shared/components/input-picker/input-picker';
import { InputPickerTrigger } from '@/shared/components/input-picker/input-picker-trigger';
import { useModal } from '@/shared/hooks/use-modal';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Text } from '@/shared/ui/text';
import { Textarea } from '@/shared/ui/textarea';
import { Title } from '@/shared/ui/title';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { CreateTariffFormLayout } from '../layouts/create-tariff-form.layout';
import { createTariffSchema } from '../model/validation/create-tariff-schema';
import { TariffAdditionalsModal } from './tariff-additionals-modal';

const daySelections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

interface CreateTariffFormProps {
    tariffValues: Pick<
        Tariff,
        'name' | 'description' | 'price' | 'term' | 'corrections' | 'additional_options'
    >;
    onSave: (data: z.infer<typeof createTariffSchema>) => void;
}

export const CreateTariffForm = (props: CreateTariffFormProps) => {
    const { tariffValues, onSave } = props;
    const additionalOptionsModal = useModal();
    const {
        register,
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<z.infer<typeof createTariffSchema>>({
        resolver: zodResolver(createTariffSchema),
        mode: 'onChange',
        defaultValues: {
            ...tariffValues,
        },
    });

    return (
        <CreateTariffFormLayout>
            <form onSubmit={handleSubmit(onSave)}>
                <Title fontSize={24} className="mb-7.5 text-center font-bold">
                    Услуга 1
                </Title>
                <Label htmlFor="name" className="mb-3 block">
                    Название
                </Label>
                <Textarea
                    id="name"
                    placeholder="Кратко опишите суть проекта"
                    className="mb-6 h-26"
                    maxLength={40}
                    {...register('name')}
                />
                <Label htmlFor="description" className="mb-3 block">
                    Описание
                </Label>
                <Textarea
                    id="description"
                    placeholder="Опишите детали, сроки, требования, ожидаемый результат и тд."
                    maxLength={120}
                    className="mb-6 h-34"
                    {...register('description')}
                />
                <Label className="mb-3 block">Параметры</Label>
                <Card className="mb-6 gap-6 p-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="title">Бюджет</Label>
                        <div className="input-bg flex max-w-[110px] items-center gap-2 overflow-hidden rounded-[10px] border px-4 py-2">
                            <span className="text-xs text-[#242424]">US$</span>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className="max-w-[70%] text-[11px] focus:outline-none"
                                        type="number"
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="title">Срок</Label>
                        <Controller
                            name="term"
                            control={control}
                            render={({ field }) => (
                                <InputPicker
                                    name="Срок"
                                    value={field.value}
                                    setValue={(value: string) => field.onChange(Number(value))}
                                    selections={daySelections}
                                    pickedValue={{ days: field.value }}
                                    renderTrigger={(value) => (
                                        <InputPickerTrigger name="Дни" value={value} />
                                    )}
                                    renderLabel={(option) => getDayLabel(option as number)}
                                />
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="title">Правки</Label>
                        <Controller
                            name="corrections"
                            control={control}
                            render={({ field }) => (
                                <InputPicker
                                    name="Правки"
                                    value={field.value}
                                    setValue={(value: string) => field.onChange(Number(value))}
                                    selections={{ corrections: [0, 1, 2, 3, 4, 5] }}
                                    pickedValue={{ corrections: field.value }}
                                    renderTrigger={(value) => (
                                        <InputPickerTrigger name="Кол-во" value={value} />
                                    )}
                                    renderLabel={(option) => (option === 0 ? 'Без правок' : option)}
                                />
                            )}
                        />
                    </div>
                </Card>
                <Label className="mb-3 block">Параметры</Label>
                <Card
                    onClick={additionalOptionsModal.open}
                    className="mb-15 flex flex-row items-center gap-0 px-4 py-3"
                >
                    <Text fontSize={15}>Добавить дополнения</Text>
                    <Text fontSize={15} className="mr-1 ml-auto">
                        Выбрать
                    </Text>
                    <img className="h-4.5 w-4.5" src="/icons/arrow-right.svg" />
                </Card>
                <Button type="submit" disabled={!isValid} className="w-full">
                    Сохранить
                </Button>
            </form>
            {additionalOptionsModal.isOpen && <TariffAdditionalsModal />}
        </CreateTariffFormLayout>
    );
};
