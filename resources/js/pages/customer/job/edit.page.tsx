import { Category } from '@/entities/category';
import { editCustomerJobSchema } from '@/features/customer/job/edit-job/model/validation';
import { InputPicker } from '@/shared/components/input-picker/input-picker';
import { InputPickerTrigger } from '@/shared/components/input-picker/input-picker-trigger';
import { ROUTES } from '@/shared/config/routes';
import { useFile } from '@/shared/hooks/use-file';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { CustomerJob, SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

type CustomerJobEditPageProps = SharedData & {
    categories: Category[];
    job: CustomerJob;
};

const daySelections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

const CustomerJobEditPage = (props: CustomerJobEditPageProps) => {
    const {
        categories = [],
        job,
        auth: { user },
    } = props;

    const photoFile = useFile();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
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

    const categoryId = watch('category_id');
    const subCategoryId = watch('sub_category_id');
    const name = watch('name');
    const description = watch('description');
    const terms = watch('terms');
    const expressMode = watch('express_mode');
    const premiumMode = watch('premium_mode');
    const subCategories = categories.find(({ id }) => id === categoryId)?.sub_categories || [];

    const photoFilePreview = photoFile.preview ?? job.photo ?? '';

    const handleClickAddPhoto = () => photoFile.ref.current?.click();

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

    return (
        <form
            onSubmit={handleSubmit(handleSave)}
            className="flex min-h-[100vh] flex-col gap-3 bg-[#efeff4] p-6 pb-12"
        >
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
                <Button type="button" className="w-full" onClick={handleClickAddPhoto}>
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
            <Select
                value={String(categoryId)}
                onValueChange={(value) =>
                    setValue('category_id', Number(value), { shouldValidate: true })
                }
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
            <Select
                value={String(subCategoryId)}
                onValueChange={(value) =>
                    setValue('sub_category_id', Number(value), { shouldValidate: true })
                }
                disabled={!categoryId}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать подкатегорию (опционально)" />
                </SelectTrigger>
                <SelectContent>
                    {subCategories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Название</Label>
                <Textarea
                    id="name"
                    placeholder="Кратко опишите суть проекта"
                    className="h-26"
                    maxLength={40}
                    value={name}
                    {...register('name')}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                    id="description"
                    placeholder="Опишите детали, сроки, требования, ожидаемый результат и тд."
                    maxLength={120}
                    value={description}
                    className="h-34"
                    {...register('description')}
                />
            </div>
            <Label>Стоимость и сроки</Label>
            <Card className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Бюджет</Label>
                    <div className="input-bg flex max-w-[110px] items-center gap-2 overflow-hidden rounded-[10px] border px-4 py-2.5">
                        <span className="text-xs text-[#242424]">US$</span>
                        <input
                            className="max-w-[70%] focus:outline-none"
                            type="number"
                            {...register('price')}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Срок</Label>
                    <InputPicker
                        name="Срок"
                        value={terms}
                        setValue={(value: string) =>
                            setValue('terms', Number(value), { shouldValidate: true })
                        }
                        selections={daySelections}
                        pickedValue={{ days: 3 }}
                        renderTrigger={(value) => <InputPickerTrigger name='Дни' value={value} />}
                        renderLabel={(option) => getDayLabel(option as number)}
                    />
                </div>
            </Card>
            <div>
                <div className="mb-3 flex items-center">
                    <h4 className="title-4 mr-0.5">Premium Функции</h4>
                    <img src="/icons/star.svg" />
                </div>
                <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                    <h4 className="title-4 mr-0.5">Экспресс-режим</h4>
                    <Switch
                        name="express_mode"
                        checked={expressMode}
                        onClick={() =>
                            setValue('express_mode', !expressMode, { shouldValidate: true })
                        }
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
                    <Switch
                        name="premium_mode"
                        checked={premiumMode}
                        onClick={() =>
                            setValue('premium_mode', !premiumMode, { shouldValidate: true })
                        }
                    />
                </div>
                <p className="text-description max-w-[269px]">
                    Фильтруются лучшие фрилансеры для сложных и высокобюджетных заказов с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <Button type="submit" disabled={!isValid}>
                Продолжить
            </Button>
        </form>
    );
};

export default CustomerJobEditPage;
