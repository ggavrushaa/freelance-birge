import { TariffList } from '@/entities/tariff';
import { Tariff } from '@/entities/tariff/model/types';
import { FormImagePreview } from '@/shared/components/FormImagePreview';
import { useFile } from '@/shared/hooks/use-file';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { editFreelanceGigSchema } from '../model/validation/edit-freelance-gig-schema';
import { router } from '@inertiajs/react';
import { ROUTES } from '@/shared/config/routes';

interface EditGigFormProps {
    formValues: z.infer<typeof editFreelanceGigSchema>;
    tariffs: Tariff[];
    onSubmit: (data: z.infer<typeof editFreelanceGigSchema>) => void;
}

export const EditGigForm = (props: EditGigFormProps) => {
    const { formValues, tariffs, onSubmit } = props;
    const { categories } = usePageProps();
    const photoFile = useFile();
    const {
        handleSubmit,
        setValue,
        control,
        formState: { isValid },
    } = useForm<z.infer<typeof editFreelanceGigSchema>>({
        resolver: zodResolver(editFreelanceGigSchema),
        mode: 'onChange',
        defaultValues: formValues,
    });

    const watchedCategoryId = useWatch({
        control,
        name: 'category_id',
    });

    const handleChangePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => setValue('photo', file, { shouldValidate: true }));
    };

    const handleClickTariff = (id:number) => {
        router.get(ROUTES.tariff.edit(id));
    }

     const handleRemoveTariff = (id:number) => {
        console.log(id);
    }

    const photoFilePreview = photoFile.preview ?? formValues.photo ?? '';

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormImagePreview preview={photoFilePreview} className="mb-3" />
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
                        categories.find(({ id }) => id === watchedCategoryId)?.sub_categories || [];
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
            <TariffList tariffs={tariffs} onClick={handleClickTariff} onRemove={handleRemoveTariff} onAdd={() => {}} />
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
                    Находите срочные заказы — заказчики ищут исполнителя прямо сейчас с{' '}
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
                    Доступ к сложным и высокобюджетным заказам с <a href="">RIKI Premium</a>
                </p>
            </div>

            <Button type="submit" disabled={!isValid} className="w-full">
                Продолжить
            </Button>
        </form>
    );
};
