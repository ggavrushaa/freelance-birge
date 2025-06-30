import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { useState } from 'react';

import Picker from 'react-mobile-picker'

const selections = {
  lastName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
}

function MyPicker() {
  const [pickerValue, setPickerValue] = useState({
    title: 'Mr.',
    firstName: 'Micheal',
    lastName: 'Jordan'
  })

  return (
    <Picker value={pickerValue} onChange={setPickerValue}>
      {Object.keys(selections).map(name => (
        <Picker.Column key={name} name={name}>
          {selections[name].map(option => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  )
}

const categiories = [
    { value: 'system', label: 'Разработка и IT' },
    { value: 'system1', label: 'Дизайн и арт' },
    { value: 'system2', label: 'Видео и аудио' },
    { value: 'system3', label: 'SEO и трафик' },
    { value: 'system4', label: 'Тексты и переводы' },
    { value: 'system5', label: 'Прочие услуги' },
];

const OrderCreate = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setTitle(e.target.value);
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.target.value);

    return (
        <div className="flex flex-col gap-3 p-6">
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
            <MyPicker/>
        </div>
    );
};

export default OrderCreate;
