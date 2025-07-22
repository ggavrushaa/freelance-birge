import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';

interface PortfolioCardProps {
    title: string;
    description: string;
    imageUrl: string | null;
    price: number;
}

export const PortfolioCard = (props: PortfolioCardProps) => {
    const { title, description, imageUrl, price } = props;
    return (
        <div>
            {imageUrl && (
                <img
                    className="h-48 w-full rounded-tl-xl rounded-tr-xl object-cover"
                    src={imageUrl}
                />
            )}
            <Card
                className={classNames(
                    'flex flex-row justify-between rounded-none rounded-br-xl rounded-bl-xl px-4 py-3',
                    'rounded-xl',
                )}
            >
                <div>
                    <Title className="font-medium">{title}</Title>
                    <Text fontSize={13}>{description}</Text>
                </div>
                <Text fontColor="primary" className="font-medium">
                    {price}$
                </Text>
            </Card>
        </div>
    );
};
