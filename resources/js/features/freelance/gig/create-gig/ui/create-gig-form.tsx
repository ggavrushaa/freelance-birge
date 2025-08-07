import { TariffList, useTariffs } from '@/entities/tariff';
import { Tariff } from '@/entities/tariff/model/types';
import { CreateTariffForm } from '@/features/tariff/create-tariff';
import { FormImagePreview } from '@/shared/components/FormImagePreview';
import { useFile } from '@/shared/hooks/use-file';
import { useModal } from '@/shared/hooks/use-modal';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { createFreelanceGigSchema } from '../model/validation';
import { router } from '@inertiajs/react';
import { ROUTES } from '@/shared/config/routes';

export const CreateGigForm = () => {
    const {
        auth: { user },
        categories,
    } = usePageProps();
    const photoFile = useFile();
    const tariffModal = useModal();
    const tariffs = useTariffs({ initialValue: [] });
    const [selectedTariffId, setSelectedTariffId] = useState<number | null>(null);

    useEffect(() => {
        const isOpen = tariffModal.isOpen;
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [tariffModal.isOpen]);

    const {
        handleSubmit,
        setValue,
        control,
        formState: { isValid },
    } = useForm<z.infer<typeof createFreelanceGigSchema>>({
        resolver: zodResolver(createFreelanceGigSchema),
        mode: 'onChange',
        defaultValues: {
            premium_mode: false,
            express_mode: false,
            photo: null,
        },
    });

    const watchedCategoryId = useWatch({
        control,
        name: 'category_id',
    });

    const handleClickTariff = (id: number) => {
        setSelectedTariffId(id);
        tariffModal.open();
    };

    const handleClickAddTariff = () => {
        const newTariff = tariffs.add();
        setSelectedTariffId(newTariff.id);
        tariffModal.open();
    };

    const handleChangePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => setValue('photo', file, { shouldValidate: true }));
    };

    const handleSave = (data: z.infer<typeof createFreelanceGigSchema>) => {
        const request = {
            ...data,
            user_id: user.id,
            tariffs: tariffs.items.map((tariff) => ({
                ...tariff,
                additional_options: tariff.additional_options?.map((option) => option.value) || [],
            })),
        };
        router.post(ROUTES.freelance.gig.create, request);
    };

    const selectedTariff = tariffs.items.find((tariff) => tariff.id === selectedTariffId) as Tariff;

    const currentCategory = categories.find(category => category.id === watchedCategoryId) || null;

    return (
        <>
            <form onSubmit={handleSubmit(handleSave)}>
                <FormImagePreview preview={photoFile.preview} className="mb-3" />
                <Button type="button" onClick={photoFile.onClick} className="mb-6 w-full">
                    Выбрать
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    ref={photoFile.ref}
                    onChange={handleChangePhotoFile}
                    className="hidden"
                />

                <Controller
                    name="category_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value ? String(field.value) : undefined}
                            onValueChange={(value) => {
                                field.onChange(Number(value));
                            }}
                        >
                            <SelectTrigger className="mb-3">
                                <SelectValue placeholder="Выбрать категорию" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                <Controller
                    name="sub_category_id"
                    control={control}
                    render={({ field }) => {
                        const subCategories =
                            categories.find(({ id }) => id === watchedCategoryId)?.sub_categories ||
                            [];
                        return (
                            <Select
                                value={field.value ? String(field.value) : undefined}
                                onValueChange={(value) => field.onChange(Number(value))}
                                disabled={!watchedCategoryId}
                            >
                                <SelectTrigger className="mb-6">
                                    <SelectValue placeholder="Выбрать подкатегорию (опционально)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategories.map((sub) => (
                                        <SelectItem key={sub.id} value={String(sub.id)}>
                                            {sub.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    }}
                />

                <Label htmlFor="name" className="mb-3 block">
                    Название
                </Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            id="name"
                            placeholder="Кратко опишите суть проекта"
                            maxLength={40}
                            className="mb-6 h-26"
                            {...field}
                        />
                    )}
                />

                <TariffList
                    tariffs={tariffs.items}
                    onClick={handleClickTariff}
                    onRemove={tariffs.remove}
                    onAdd={handleClickAddTariff}
                />

                <div className="mb-3">
                    <div className="mb-3 flex items-center">
                        <h4 className="title-4 mr-0.5">Premium Функции</h4>
                        <img src="/icons/star.svg" />
                    </div>
                    <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                        <h4 className="title-4 mr-0.5">Экспресс-режим</h4>
                        <Controller
                            name="express_mode"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                />
                            )}
                        />
                    </div>
                    <p className="text-description max-w-[269px]">
                        Быстрый поиск фрилансера: заказ поднимается в топ списка с{' '}
                        <a href="">RIKI Premium</a>
                    </p>
                </div>

                <div className="mb-7">
                    <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                        <h4 className="title-4 mr-0.5">Только для Premium</h4>
                        <Controller
                            name="premium_mode"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                />
                            )}
                        />
                    </div>
                    <p className="text-description max-w-[269px]">
                        Фильтруются лучшие фрилансеры для сложных и высокобюджетных заказов с{' '}
                        <a href="">RIKI Premium</a>
                    </p>
                </div>

                <Button type="submit" disabled={!isValid} className="w-full">
                    Продолжить
                </Button>
            </form>
            {tariffModal.isOpen && (
                <CreateTariffForm
                    tariffValues={{
                        name: selectedTariff?.name,
                        description: selectedTariff?.description,
                        price: selectedTariff?.price,
                        term: selectedTariff?.term,
                        corrections: selectedTariff?.corrections,
                        additional_options: selectedTariff?.additional_options || null,
                    }}
                    tariffIndex={selectedTariff?.id}
                    onSave={(data) => {
                        tariffs.edit(selectedTariff.id, data);
                        tariffModal.close();
                    }}
                    withAdditionals={currentCategory ? (currentCategory.slug === "developing" || currentCategory.slug === "design") : false}
                />
            )}
        </>
    );
};
