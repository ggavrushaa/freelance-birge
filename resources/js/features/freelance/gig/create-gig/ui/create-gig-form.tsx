import { FormImagePreview } from '@/shared/components/FormImagePreview';
import { useFile } from '@/shared/hooks/use-file';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Text } from '@/shared/ui/text';
import { Textarea } from '@/shared/ui/textarea';
import { Title } from '@/shared/ui/title';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { createFreelanceGigSchema } from '../model/validation';

const useFormServices = ({ initialValue }: { initialValue: unknown[] }) => {
    const [items, setItems] = useState(initialValue);

    const add = () => {
        setItems([...items, { id: items.length + 1, name: `Услуга ${items.length + 1}` }]);
    };

    const remove = (index: number) => {
        setItems(items.filter((_, id) => id !== index));
    };
    
    return {
        items,
        add,
        remove,
    };
};

const FormServices = () => {
    const services = useFormServices({ initialValue: [] });
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit((prev) => !prev);

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
                {services.items.map((_, index) => (
                    <div
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
                                onClick={() => services.remove(index)}
                                className="h-4.5 w-4.5"
                                src="/icons/close-gray.svg"
                            />
                        ) : (
                            <img className="h-4.5 w-4.5" src="/icons/arrow-right.svg" />
                        )}
                    </div>
                ))}
                <div
                    onClick={services.add}
                    className={classNames(
                        'flex items-center gap-2.5',
                        services.items.length === 0 ? 'pt-0' : 'pt-2.5',
                    )}
                >
                    <img src="/icons/plus-gray.svg" />
                    <Text className="font-medium">Услуга {services.items.length + 1}</Text>
                </div>
            </Card>
        </div>
    );
};

export const CreateGigForm = () => {
    const { categories } = usePageProps();
    const photoFile = useFile();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
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

    const categoryId = watch('category_id');
    const name = watch('name');
    const expressMode = watch('express_mode');
    const premiumMode = watch('premium_mode');
    const subCategories = categories.find(({ id }) => id === categoryId)?.sub_categories || [];

    const handleClickChoosePhoto = () => photoFile.ref.current?.click();

    const handleChangePhotoFile = (e: ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => setValue('photo', file, { shouldValidate: true }));
    };

    const handleSave = (data: z.infer<typeof createFreelanceGigSchema>) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <FormImagePreview preview={photoFile.preview} className="mb-3" />
            <Button type="button" onClick={handleClickChoosePhoto} className="mb-6 w-full">
                Выбрать
            </Button>
            <input
                type="file"
                accept="image/*"
                ref={photoFile.ref}
                onChange={handleChangePhotoFile}
                className="hidden"
            />
            <Select
                onValueChange={(value) => {
                    setValue('category_id', Number(value), { shouldValidate: true });
                    setValue('sub_category_id', null, { shouldValidate: true });
                }}
            >
                <SelectTrigger className="mb-3">
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
                <SelectTrigger className="mb-6">
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
            <Label htmlFor="name" className="mb-3 block">
                Название
            </Label>
            <Textarea
                id="name"
                placeholder="Кратко опишите суть проекта"
                maxLength={40}
                value={name}
                {...register('name')}
                className="mb-6 h-26"
            />
            <FormServices />
            <div className="mb-3">
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
            <Button type="submit" disabled={!isValid} className="w-full">
                Продолжить
            </Button>
        </form>
    );
};
