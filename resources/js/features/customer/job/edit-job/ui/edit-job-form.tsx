import { Job } from '@/entities/job';
import { InputPicker } from '@/shared/components/input-picker/input-picker';
import { InputPickerTrigger } from '@/shared/components/input-picker/input-picker-trigger';
import { ROUTES } from '@/shared/config/routes';
import { daySelections } from '@/shared/consts';
import { useFile } from '@/shared/hooks/use-file';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { ChangeEvent } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { editCustomerJobSchema } from '../model/validation';

interface EditJobFormProps {
    job: Job;
}

export const EditJobForm = (props: EditJobFormProps) => {
    const { job } = props;
    const {
        categories = [],
        auth: { user },
    } = usePageProps();

    const photoFile = useFile();

    const {
        handleSubmit,
        setValue,
        control,
        formState: { isValid },
    } = useForm<z.infer<typeof editCustomerJobSchema>>({
        resolver: zodResolver(editCustomerJobSchema),
        mode: 'onChange',
        defaultValues: {
            name: job.name,
            description: job.description,
            price: job.price,
            terms: job.terms,
            category_id: job.category_id,
            sub_category_id: job.sub_category_id,
            express_mode: Boolean(job.express_mode),
            premium_mode: Boolean(job.premium_mode),
            photo: job.photo,
        },
    });

    const photoFilePreview = photoFile.preview ?? job.photo ?? '';

    const handlePhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => {
            setValue('photo', file, { shouldValidate: true });
        });
    };

    const handleSave = (data: z.infer<typeof editCustomerJobSchema>) => {
        const { photo, ...rest } = data;
        const payload = {
            ...rest,
            ...(photo !== job.photo && { photo }),
            user_id: user.id,
        };
        router.post(ROUTES.customer.job.update(job.id), payload);
    };

    const watchedCategoryId = useWatch({
        control,
        name: 'category_id',
    });

    return (
        <div className="flex flex-1 flex-col gap-3 bg-[#efeff4] p-6 pb-12">
            <div className="flex flex-col items-center gap-2">
                <div
                    className="flex h-48 w-full items-center justify-center overflow-hidden rounded-sm border bg-[#fff]"
                    style={{
                        backgroundImage: photoFilePreview ? `url(${photoFilePreview})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {photoFilePreview ? null : <p className="font-semibold">Ваше фото</p>}
                </div>
                <Button type="button" className="w-full" onClick={photoFile.ref.current?.click}>
                    Добавить
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    ref={photoFile.ref}
                    onChange={handlePhotoFileChange}
                    className="hidden"
                />
            </div>
            <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                    <Select
                        value={field.value?.toString()}
                        onValueChange={(val) => field.onChange(Number(val))}
                    >
                        <SelectTrigger>
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
                            value={field.value?.toString()}
                            onValueChange={(val) => field.onChange(Number(val))}
                            disabled={!control._formValues.category_id}
                        >
                            <SelectTrigger>
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
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Название</Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            id="name"
                            placeholder="Кратко опишите суть проекта"
                            className="h-26"
                            maxLength={40}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Описание</Label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            id="description"
                            placeholder="Опишите детали, сроки, требования, ожидаемый результат и тд."
                            maxLength={1200}
                            className="h-34"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
            <Label>Стоимость и сроки</Label>
            <Card className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Бюджет</Label>
                    <div className="input-bg flex max-w-[110px] items-center gap-2 overflow-hidden rounded-[10px] border px-4 py-1">
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
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <InputPicker
                                name="Срок"
                                value={field.value}
                                setValue={(val: string) => field.onChange(val)}
                                selections={daySelections}
                                pickedValue={{ days: 3 }}
                                renderTrigger={(val) => (
                                    <InputPickerTrigger name="Дни" value={val} />
                                )}
                                renderLabel={(option) => getDayLabel(option as number)}
                            />
                        )}
                    />
                </div>
            </Card>
            <div>
                <div className="mb-3 flex items-center">
                    <h4 className="title-4 mr-0.5">Premium Функции</h4>
                    <img src="/icons/star.svg" />
                </div>
                <Controller
                    name="express_mode"
                    control={control}
                    render={({ field }) => (
                        <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                            <h4 className="title-4 mr-0.5">Экспресс-режим</h4>
                            <Switch
                                checked={field.value}
                                onCheckedChange={(val) => field.onChange(val)}
                            />
                        </div>
                    )}
                />
                <p className="text-description max-w-[269px]">
                    Быстрый поиск фрилансера: заказ поднимается в топ списка с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <div className="mb-7">
                <Controller
                    name="premium_mode"
                    control={control}
                    render={({ field }) => (
                        <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                            <h4 className="title-4 mr-0.5">Только для Premium</h4>
                            <Switch
                                checked={field.value}
                                onCheckedChange={(val) => field.onChange(val)}
                            />
                        </div>
                    )}
                />
                <p className="text-description max-w-[269px]">
                    Фильтруются лучшие фрилансеры для сложных и высокобюджетных заказов с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <Button onClick={handleSubmit(handleSave)} disabled={!isValid} type="submit">
                Продолжить
            </Button>
        </div>
    );
};
