import { MultiSelect } from '@/shared/components/multi-select/multi-select';
import { SelectItem } from '@/shared/ui/select';
import { Skill } from '../model/types';

interface SkillsSelectionProps {
    availableSkills: Skill[];
    selectedSkills: Skill[];
    onChange: (lang: Skill) => void;
    onRemove: (lang: Skill) => void;
}

export const SkillsSelection = (props: SkillsSelectionProps) => {
    const { availableSkills, selectedSkills, onChange, onRemove } = props;
    return (
        <MultiSelect
            items={availableSkills}
            selectedItems={selectedSkills}
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
