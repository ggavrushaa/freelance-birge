import { MultiSelect } from '@/shared/components/multi-select/multi-select';
import { SelectItem } from '@/shared/ui/select';
import { Language } from '../model/types';

interface LanguagesSelectorProps {
    availableLanguages: Language[];
    selectedLanguages: Language[];
    onChange: (lang: Language) => void;
    onRemove: (lang: Language) => void;
}

export const LanguagesSelection = (props: LanguagesSelectorProps) => {
    const { availableLanguages, selectedLanguages, onChange, onRemove } = props;
    return (
        <MultiSelect
            items={availableLanguages}
            selectedItems={selectedLanguages}
            getLabel={(item) => item.name}
            getValue={(item) => String(item.id)}
            onChange={onChange}
            onRemove={onRemove}
            renderSelectItem={(item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                </SelectItem>
            )}
            className="bg-transparent! p-0!"
        />
    );
};
