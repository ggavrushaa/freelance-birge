import { FormImagePreview } from '@/shared/components/FormImagePreview';
import { InputPicker } from '@/shared/components/input-picker/input-picker';
import { InputPickerTrigger } from '@/shared/components/input-picker/input-picker-trigger';
import { useFile } from '@/shared/hooks/use-file';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { createPortfolioSchema } from '../model/validation/create-portfolio-schema';

const daySelections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

interface CreatePortfolioFormProps {
    profileId: number;
}

export const CreatePortfolioForm = (props: CreatePortfolioFormProps) => {
    const { profileId } = props;
    const { categories } = usePageProps();
    const photoFile = useFile();
    const {
        handleSubmit,
        setValue,
        control,
        formState: { isValid },
    } = useForm<z.infer<typeof createPortfolioSchema>>({
        resolver: zodResolver(createPortfolioSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            image: null,
            price: 0,
            terms: 0,
        },
    });
    const watchedCategoryId = useWatch({
        control,
        name: 'category_id',
    });

    const handleChangePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => setValue('image', file));
    };

    const handleSave = (data: z.infer<typeof createPortfolioSchema>) => {
        router.post('/portfolio', {
            ...data,
            profile_id: profileId,
        });
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <FormImagePreview
                preview={photoFile.preview}
                placeholder="Фото (опционально)"
                className="mb-3 bg-[#efeff4]!"
            />
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
            <Label htmlFor="title" className="mb-3 block">
                Название
            </Label>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <Textarea
                        id="name"
                        placeholder="Опишите суть выполненной работы"
                        maxLength={40}
                        className="mb-6 h-26"
                        {...field}
                    />
                )}
            />
            <Label htmlFor="description" className="mb-3 block">
                Название
            </Label>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <Textarea
                        id="description"
                        placeholder="Опишите выполненные задачи, используемые технологии, результаты и другие детали проекта."
                        maxLength={1200}
                        className="mb-6 h-34"
                        {...field}
                    />
                )}
            />
            <Label className="mb-3 block">Параметры</Label>
            <Card className="mb-6 gap-6 bg-[#eeeeef] p-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Цена</Label>
                    <div className="flex max-w-[110px] items-center gap-2 overflow-hidden rounded-[10px] border bg-[#fff] px-4 py-2">
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
                    <Label>Срок</Label>
                    <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <InputPicker
                                name="Срок"
                                value={field.value}
                                setValue={(value: string) => field.onChange(Number(value))}
                                selections={daySelections}
                                pickedValue={{ days: field.value }}
                                renderTrigger={(value) => (
                                    <InputPickerTrigger
                                        name="Дни"
                                        value={value}
                                        className="bg-[#fff]!"
                                    />
                                )}
                                renderLabel={(option) => getDayLabel(option as number)}
                            />
                        )}
                    />
                </div>
            </Card>
            <Button type="submit" disabled={!isValid} className="w-full">
                Готово
            </Button>
        </form>
    );
};
