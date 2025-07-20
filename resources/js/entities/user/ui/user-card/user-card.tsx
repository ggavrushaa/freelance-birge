import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { UserCardHeader } from './user-card-header';

interface UserCardProps {
    className?: string;
}

export const UserCard = (props: UserCardProps) => {
    // const {} = props;
    return (
        <Card className={classNames('gap-4 rounded-xl p-4', props.className)}>
            <UserCardHeader />
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <Title className="font-medium">Заказов</Title>
                        <Text className="font-medium">345</Text>
                    </div>
                    <div className="flex justify-between">
                        <Title className="font-medium">Выполнено</Title>
                        <Text className="font-medium">257</Text>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="mt-auto flex items-center">
                        <img src="/icons/star2.svg" />
                        <span className="text-14 font-medium">4.9</span>
                        <span className="text-8 mt-1 ml-1 text-gray">(777)</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};
