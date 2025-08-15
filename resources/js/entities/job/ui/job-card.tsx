import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface JobCardProps {
    title: string;
    isPremium: boolean;
    description: string;
    price: string;
    terms: string;
}

export const JobCard = (props: JobCardProps) => {
    const { title, isPremium, description, price ,terms} = props;
    return (
        <Card className="relative gap-0 overflow-hidden rounded-xl p-0 px-4 py-3">
            <div className="mb-1.5 flex flex-row gap-2">
                <Title fontSize={17} className="font-medium">
                    {title}
                </Title>
                {isPremium && <Badge>Premium</Badge>}
            </div>
            <div className="flex justify-between">
                <Text fontSize={11} className="max-w-[196px]">
                    {description}
                </Text>
                <div className="flex items-end gap-1.5">
                    <Text fontSize={11} className="shrink-0 self-end">
                        {terms}
                    </Text>
                    <p>US${price}</p>
                </div>
            </div>
        </Card>
    );
};
