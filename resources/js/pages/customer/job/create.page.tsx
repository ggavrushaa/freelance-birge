import { Category } from '@/entities/category';
import { createCustomerJobSchema } from '@/features/customer/job/create-job';
import { DayPicker } from '@/shared/components/day-picker';
import { FormImagePreview } from '@/shared/components/FormImagePreview';
import { ROUTES } from '@/shared/config/routes';
import { useFile } from '@/shared/hooks/use-file';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const selections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

type CustomerJobCreateProps = SharedData & {
    categories: Category[];
};

const CustomerJobCreatePage = (props: CustomerJobCreateProps) => {
    const {
        categories,
        auth: { user },
    } = props;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isValid },
    } = useForm<z.infer<typeof createCustomerJobSchema>>({
        resolver: zodResolver(createCustomerJobSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            price: '0',
            express_mode: false,
            premium_mode: false,
            photo: null,
        },
    });
    const photoFile = useFile();

    const name = watch('name');
    const description = watch('description');
    const categoryId = watch('category_id');
    const terms = watch('terms');
    const expressMode = watch('express_mode');
    const premiumMode = watch('premium_mode');
    const subCategories = categories.find(({ id }) => id === categoryId)?.sub_categories || [];

    const handleClickAddPhoto = () => photoFile.ref.current?.click();

    const handleChangePhotoFile = (e: ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => setValue('photo', file, { shouldValidate: true }));
    };

    const handleSave = (data: z.infer<typeof createCustomerJobSchema>) => {
        router.post(`/${ROUTES.customer.job.create}`, {
            ...data,
            user_id: user.id,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(handleSave)}
            className="flex min-h-[100vh] flex-col gap-3 bg-[#efeff4] p-6 pb-12"
        >
            <div className="flex flex-col items-center gap-2">
                <FormImagePreview preview={photoFile.preview} />
                <Button className="w-full" onClick={handleClickAddPhoto}>
                    Добавить
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    ref={photoFile.ref}
                    onChange={handleChangePhotoFile}
                    className="hidden"
                />
            </div>
            <Select
                onValueChange={(value) =>
                    setValue('category_id', Number(value), { shouldValidate: true })
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать категорию" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={String(category.id)}
                            onSelect={() => console.log(category)}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
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
                    <DayPicker
                        value={terms}
                        setValue={(value: string) =>
                            setValue('terms', value, { shouldValidate: true })
                        }
                        selections={selections}
                        pickedValue={{ days: 3 }}
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

export default CustomerJobCreatePage;
