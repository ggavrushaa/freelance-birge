import { Language } from '@/entities/language';
import { Skill } from '@/entities/skill';
import { MultiSelect } from '@/shared/components/multi-select/multi-select';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { SelectItem } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { createProfileSchema } from '../model/validation/create-profile-schema';
import { getIds } from '../utils/getIds';

interface CreateProfileFormProps {
    languages: Language[];
    skills: Skill[];
}

export const CreateProfileForm = (props: CreateProfileFormProps) => {
    const { languages, skills } = props;

    const {
        auth: { user },
    } = usePageProps();

    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<z.infer<typeof createProfileSchema>>({
        resolver: zodResolver(createProfileSchema),
        mode: 'onChange',
        defaultValues: {
            description: '',
            languages: null,
            skills: null,
        },
    });

    const handleSave = (data: z.infer<typeof createProfileSchema>) => {
        router.post('/profile', {
            ...data,
            languages: data.languages ? getIds(data.languages) : null,
            skills: data.skills ? getIds(data.skills) : null,
            user_id: user.id,
        });
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <Label htmlFor="description" className="mb-3 block">
                Название
            </Label>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <Textarea
                        id="description"
                        placeholder="Указывать личные контакты или размещать ссылки на сторонние сайты и соцсети запрещено."
                        maxLength={240}
                        {...field}
                        className="mb-6 h-50"
                    />
                )}
            />

            <Label htmlFor="language" className="mb-3 block">
                Язык
            </Label>
            <Controller
                name="languages"
                control={control}
                render={({ field }) => {
                    const selectedItems: Language[] = field.value ?? [];
                    const availableItems = languages.filter(
                        (item) => !selectedItems.some((i: Language) => i.id === item.id),
                    );
                    const handleAdd = (item: Language) => {
                        field.onChange([...selectedItems, item]);
                    };
                    const handleRemove = (item: Language) => {
                        field.onChange(selectedItems.filter((i: Language) => i.id !== item.id));
                    };
                    return (
                        <MultiSelect
                            items={availableItems}
                            selectedItems={selectedItems}
                            getLabel={(item) => item.name}
                            getValue={(item) => String(item.id)}
                            onChange={handleAdd}
                            onRemove={handleRemove}
                            renderSelectItem={(item) => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                    {item.name}
                                </SelectItem>
                            )}
                            className="mb-6"
                        />
                    );
                }}
            />

            <Label htmlFor="skills" className="mb-3 block">
                Навыки
            </Label>
            <Controller
                name="skills"
                control={control}
                render={({ field }) => {
                    const selectedItems: Skill[] = field.value ?? [];
                    const availableItems = skills.filter(
                        (item) => !selectedItems.some((i: Skill) => i.id === item.id),
                    );
                    const handleAdd = (item: Skill) => {
                        field.onChange([...selectedItems, item]);
                    };
                    const handleRemove = (item: Skill) => {
                        field.onChange(selectedItems.filter((i: Skill) => i.id !== item.id));
                    };
                    return (
                        <MultiSelect
                            items={availableItems}
                            selectedItems={selectedItems}
                            getLabel={(item) => item.name}
                            getValue={(item) => String(item.id)}
                            onChange={handleAdd}
                            onRemove={handleRemove}
                            renderSelectItem={(item) => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                    {item.name}
                                </SelectItem>
                            )}
                            className="mb-6"
                        />
                    );
                }}
            />

            <Button disabled={!isValid} type="submit" className="w-full">
                Готово
            </Button>
        </form>
    );
};
