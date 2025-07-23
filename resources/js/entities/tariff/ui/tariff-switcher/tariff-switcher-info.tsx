import { Card } from "@/shared/ui/card";
import { CollapsableText } from "@/shared/ui/collapsable-text";
import { Text } from "@/shared/ui/text";
import { getDayLabel } from "@/shared/utils/get-day-label";
import classNames from "classnames";

interface TariffSwitcherInfoProps {
    description: string;
    term: number;
    corrections: number;
    className?:string;
}

export const TariffSwitcherInfo = (props:TariffSwitcherInfoProps) => {
    const {description,term,corrections} = props;
    return (
        <Card className={classNames("mt-5 gap-0 px-4 py-3",props.className)}>
            <CollapsableText text={description} />
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <Text fontSize={15} className="font-medium">
                        Срок
                    </Text>
                    <Text fontColor="black" className="font-medium">
                        {getDayLabel(term)}
                    </Text>
                </div>
                <div className="flex justify-between">
                    <Text fontSize={15} className="font-medium">
                        Правок
                    </Text>
                    <Text fontColor="black" className="font-medium">{corrections}</Text>
                </div>
                <div className="flex justify-between">
                    <Text fontSize={15} className="font-medium">
                        Vector File
                    </Text>
                    <Text fontColor="black" className="font-medium">
                        <img src="/icons/check.svg" className="h-4 w-4" />
                    </Text>
                </div>
                <div className="flex justify-between">
                    <Text fontSize={15} className="font-medium">
                        Commercial use
                    </Text>
                    <Text fontColor="black" className="font-medium">
                        <img src="/icons/close-gray.svg" className="h-5 w-5" />
                    </Text>
                </div>
            </div>
        </Card>
    );
};
