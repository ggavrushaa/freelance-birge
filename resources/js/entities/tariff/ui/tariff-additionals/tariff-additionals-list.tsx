import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { AdditionalOption } from '@/types';

interface TariffAdditionalsListProps {
    choosenOptionValues: AdditionalOption[];
    additionalOptions: AdditionalOption[];
    onClickOption: (value: AdditionalOption) => void;
}

export const TariffAdditionalsList = (props: TariffAdditionalsListProps) => {
    const { onClickOption, choosenOptionValues, additionalOptions } = props;
    const renderOptionIcon = (value: string) => {
        const isExistOption = choosenOptionValues.find(
            (choosenOptionValue) => choosenOptionValue.value === value,
        );
        if (isExistOption) {
            return <img src="/icons/checked.svg" alt="" />;
        }
        return <img src="/icons/unchecked.svg" alt="" />;
    };
    return (
        <Card className="gap-0 px-4 py-0">
            {additionalOptions.map((option, index) => (
                <div
                    key={index}
                    onClick={() => onClickOption(option)}
                    className="flex cursor-pointer items-center gap-4"
                >
                    {renderOptionIcon(option.value)}
                    <div className="flex-1 border-b-[0.33px] border-gray py-2.5">
                        <Text className="max-w-[174px]" fontSize={15}>
                            {option.label}
                        </Text>
                    </div>
                </div>
            ))}
        </Card>
    );
};
