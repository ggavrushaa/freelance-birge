import { DayPicker } from '@/shared/components/day-picker';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { ChangeEvent, useRef, useState } from 'react';

const categiories = [
    { value: 'system', label: 'Разработка и IT', id: 1 },
    { value: 'system1', label: 'Дизайн и арт', id: 2 },
    { value: 'system2', label: 'Видео и аудио', id: 3 },
    { value: 'system3', label: 'SEO и трафик', id: 4 },
    { value: 'system4', label: 'Тексты и переводы', id: 5 },
    { value: 'system5', label: 'Прочие услуги', id: 6 },
];

const selections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

interface InitialFormData {
    name: string;
    description: string;
    photo: string;
    price: string;
    terms: string | null;
    is_active: boolean;
    express_mode: boolean;
    premium_mode: boolean;
    category_id: number | null;
    subcategory_id: number | null;
    user_id: number;
}

const initialFormData: InitialFormData = {
    name: '',
    description: '',
    photo: '',
    price: '0',
    terms: null,
    is_active: false,
    express_mode: false,
    premium_mode: false,
    category_id: null,
    subcategory_id: null,
    user_id: 1080,
};

const isFilled = (data: InitialFormData) => {
    return (
        data.name.trim() !== '' &&
        data.description.trim() !== '' &&
        data.photo.trim() !== '' &&
        data.price.trim() !== '' &&
        data.terms !== null &&
        data.terms.trim() !== '' &&
        data.category_id !== null &&
        data.user_id !== null
    );
};

const CustomerJobCreate = () => {
    const [formData, setFormData] = useState(initialFormData);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleChangeCategory = (categoryId: number) => {
        setFormData((prev) => ({
            ...prev,
            category_id: categoryId,
        }));
    };

    const handleChangeSubCategory = (categoryId: number) => {
        setFormData((prev) => ({
            ...prev,
            category_id: categoryId,
        }));
    };

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            name: event.target.value,
        }));
    };

    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            description: event.target.value,
        }));
    };

    const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            price: event.target.value,
        }));
    };

    const handleChangeTerms = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            terms: value,
        }));
    };

    const toggleExpressMode = () => {
        setFormData((prev) => ({
            ...prev,
            express_mode: !prev.express_mode,
        }));
    };

    const togglePremiumMode = () => {
        setFormData((prev) => ({
            ...prev,
            premium_mode: !prev.premium_mode,
        }));
    };

    const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChangePhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangePhoto = (url: string) => {
        setFormData((prev) => ({
            ...prev,
            photo: url,
        }));
    };

    const handleClickAddPhoto = () => fileRef.current?.click();

    const handleSave = () => {
        console.log(formData);
    };

    const isFilledForm = isFilled(formData);

    return (
        <div className="flex min-h-[100vh] flex-col gap-3 bg-[#efeff4] p-6 pb-12">
            <div className="flex flex-col items-center gap-2">
                <div
                    className="flex h-48 w-full items-center justify-center overflow-hidden rounded-sm border bg-[#fff]"
                    style={{
                        backgroundImage: formData.photo ? `url(${formData.photo})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {formData.photo ? null : <p className="font-semibold">Ваше фото</p>}
                </div>
                <Button className="w-full" onClick={handleClickAddPhoto}>
                    Добавить
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={handlePhotoFileChange}
                    className="hidden"
                />
            </div>
            <Select onValueChange={(value) => handleChangeCategory(Number(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать категорию" />
                </SelectTrigger>
                <SelectContent>
                    {categiories.map((category) => (
                        <SelectItem
                            onSelect={() => console.log(category)}
                            key={category.value}
                            value={String(category.id)}
                        >
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleChangeSubCategory(Number(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать подкатегорию (опционально)" />
                </SelectTrigger>
                <SelectContent>
                    {categiories.map((category) => (
                        <SelectItem key={category.value} value={String(category.id)}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Название</Label>
                <Textarea
                    id="title"
                    value={formData.name}
                    onChange={(event) => handleChangeName(event)}
                    placeholder="Кратко опишите суть проекта"
                    className="h-26"
                    maxLength={40}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Описание</Label>
                <Textarea
                    id="title"
                    value={formData.description}
                    onChange={handleChangeDescription}
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
                            onChange={(event) => handleChangePrice(event)}
                            type="text"
                            value={formData.price}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Срок</Label>
                    <DayPicker
                        value={formData.terms}
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
                    <Switch checked={formData.express_mode} onClick={toggleExpressMode} />
                </div>
                <p className="text-description max-w-[269px]">
                    Быстрый поиск фрилансера: заказ поднимается в топ списка с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <div className="mb-7">
                <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                    <h4 className="title-4 mr-0.5">Только для Premium</h4>
                    <Switch checked={formData.premium_mode} onClick={togglePremiumMode} />
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

export default CustomerJobCreate;
