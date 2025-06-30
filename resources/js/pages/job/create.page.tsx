import { DayPicker } from '@/shared/components/day-picker';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { ChangeEvent, useState } from 'react';

const categiories = [
    { value: 'system', label: 'Разработка и IT' },
    { value: 'system1', label: 'Дизайн и арт' },
    { value: 'system2', label: 'Видео и аудио' },
    { value: 'system3', label: 'SEO и трафик' },
    { value: 'system4', label: 'Тексты и переводы' },
    { value: 'system5', label: 'Прочие услуги' },
];

const selections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

const CustomerJobCreate = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value);

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.target.value);

    return (
        <div className="flex min-h-[100vh] flex-col gap-3 bg-[#efeff4] p-6 pb-12">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать категорию" />
                </SelectTrigger>
                <SelectContent>
                    {categiories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать подкатегорию (опционально)" />
                </SelectTrigger>
                <SelectContent>
                    {categiories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Название </Label>
                <Textarea
                    id="title"
                    value={title}
                    onChange={handleChangeTitle}
                    placeholder="Кратко опишите суть проекта"
                    className="h-26"
                    maxLength={40}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Описание </Label>
                <Textarea
                    id="title"
                    value={description}
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
                    <div className="input-bg flex max-w-[110px] items-center gap-2 rounded-[10px] border px-4 py-2.5">
                        <span className="text-xs text-[#242424]">US$</span>
                        <input type="text" value={'0.00'} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Бюджет</Label>
                    <DayPicker selections={selections} pickedValue={{ days: 3 }} />
                </div>
            </Card>
            <div>
                <div className="flex items-center mb-3">
                    <h4 className="title-4 mr-0.5">Premium Функции</h4>
                    <img src="/icons/star.svg" />
                </div>
                <div className="card flex items-center justify-between rounded-[10px] px-4 py-3 mb-1">
                    <h4 className="title-4 mr-0.5">Экспресс-режим</h4>
                    <Switch />
                </div>
                <p className="text-description max-w-[269px]">
                    Быстрый поиск фрилансера: заказ поднимается в топ списка с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <div className='mb-7'>
                <div className="card flex items-center justify-between rounded-[10px] px-4 py-3 mb-1">
                    <h4 className="title-4 mr-0.5">Только для Premium</h4>
                    <Switch />
                </div>
                <p className="text-description max-w-[269px]">
                    Фильтруются лучшие фрилансеры для сложных и высокобюджетных заказов с <a href="">RIKI Premium</a>
                </p>
            </div>
            <Button>Продолжить</Button>
        </div>
    );
};

export default CustomerJobCreate;
