import { useCustomerJobForm } from '@/features/customer/job';
import { EditCustomerJobFormValues } from '@/features/customer/job/edit-job';
import { isCustomerJobEditFormFilled } from '@/features/customer/job/edit-job/model/validation';
import { DayPicker } from '@/shared/components/day-picker';
import { ROUTES } from '@/shared/config/routes';
import { useFile } from '@/shared/hooks/use-file';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { Category, CustomerJob, SharedData } from '@/types';
import { router } from '@inertiajs/react';
import { ChangeEvent } from 'react';

type CustomerJobEditPageProps = SharedData & {
    categories: Category[];
    job: CustomerJob;
};

const selections = {
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
        formData,
        setFormData,
        handleChangeCategoryId,
        handleChangeTerms,
        handleChangeField,
        toggleMode,
    } = useCustomerJobForm<EditCustomerJobFormValues>({
        name: job.name,
        description: job.description,
        photo: null,
        price: job.price,
        terms: job.terms,
        is_active: job.is_active,
        express_mode: job.express_mode,
        premium_mode: job.premium_mode,
        category_id: job.category_id,
        sub_category_id: job.sub_category_id,
    });

    const handleSave = () => {
        const { photo, ...rest } = formData;
        const payload = {
            ...rest,
            ...(photo && { photo }),
            user_id: user.id,
        };
        router.post(ROUTES.customer.job.update(job.id), payload);
    };

    const handleClickAddPhoto = () => photoFile.ref.current?.click();

    const handlePhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => {
            setFormData((prev) => ({ ...prev, photo: file }));
        });
    };

    const isFilledForm = isCustomerJobEditFormFilled(formData);

    const subCategories =
        categories.find(({ id }) => id === formData.category_id)?.sub_categories || [];

    const photoFilePreview = photoFile.preview ? photoFile.preview : job.photo;

    return (
        <div className="flex min-h-[100vh] flex-col gap-3 bg-[#efeff4] p-6 pb-12">
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
                <Button className="w-full" onClick={handleClickAddPhoto}>
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
                value={String(formData.category_id)}
                onValueChange={(value) => handleChangeCategoryId('category_id', Number(value))}
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
                value={String(formData.sub_category_id)}
                onValueChange={(value) => handleChangeCategoryId('sub_category_id', Number(value))}
                disabled={!formData.category_id}
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
                <Label htmlFor="title">Название</Label>
                <Textarea
                    id="title"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeField}
                    placeholder="Кратко опишите суть проекта"
                    className="h-26"
                    maxLength={40}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Описание</Label>
                <Textarea
                    id="title"
                    name="description"
                    value={formData.description}
                    onChange={handleChangeField}
                    placeholder="Опишите детали, сроки, требования, ожидаемый результат и тд."
                    maxLength={120}
                    className="h-34"
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
                            name="price"
                            onChange={handleChangeField}
                            type="text"
                            value={formData.price}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Срок</Label>
                    <DayPicker
                        value={String(formData.terms)}
                        setValue={handleChangeTerms}
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
                        checked={Boolean(formData.express_mode)}
                        onClick={() => toggleMode('express_mode')}
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
                        checked={Boolean(formData.premium_mode)}
                        onClick={() => toggleMode('premium_mode')}
                    />
                </div>
                <p className="text-description max-w-[269px]">
                    Фильтруются лучшие фрилансеры для сложных и высокобюджетных заказов с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <Button disabled={!isFilledForm} onClick={handleSave}>
                Продолжить
            </Button>
        </div>
    );
};

export default CustomerJobEditPage;
