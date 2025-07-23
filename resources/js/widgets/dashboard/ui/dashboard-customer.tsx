import { CategoryCard } from '@/entities/category';
import { useFocus } from '@/shared/hooks/use-focus';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Logo } from '@/shared/ui/logo';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import cls from 'classnames';
import { DashboardSlider } from './dashboard-slider/dashboard-slider';

interface DashboardCustomerProps {
    categories: SharedData['categories'];
}

export const DashboardCustomer = (props: DashboardCustomerProps) => {
    const { categories } = props;
    const searchInput = useFocus();
    return (
        <main className="flex-1 bg-[#efeff4] pt-20">
            <Logo className="mx-auto mb-7 h-12.5 w-28" />
            <div className="mb-4 px-6">
                <InputWithIcon
                    placeholder="Поиск"
                    renderIcon={() => <img src="/icons/search.svg" alt="search" />}
                    onFocus={searchInput.focus}
                    onBlur={searchInput.blur}
                    className={cls(
                        'rounded-xl py-1 pl-[40%] transition-all duration-300',
                        searchInput.isFocused && 'pl-3',
                    )}
                />
            </div>
            <div className="mb-3 flex items-center justify-between px-6">
                <Title>Популярные услуги</Title>
                <Text className="text-gray">Все</Text>
            </div>
            <ul className="scrollbar-hide mb-3 flex gap-3 overflow-auto px-6">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageUrl={category.icon as string}
                        color={category.color as string}
                        className="w-full min-w-[100px] rounded-xl p-2.5"
                    />
                ))}
            </ul>
            <Card className="mx-6 mb-4 flex flex-row justify-between p-4">
                <div>
                    <Text>Ваш баланс</Text>
                    <Title fontSize={28} className="font-bold">
                        $14.765.423
                    </Title>
                </div>
                <Badge className="flex h-fit items-center gap-1 px-2 py-1">
                    <img src="/icons/wallet.svg" alt="wallet" />
                    <Text fontSize={13}>Подробнее</Text>
                </Badge>
            </Card>
            <div className="mb-4.5 grid grid-cols-2 gap-2 px-6">
                <Button variant="secondary">
                    <img src="/icons/plus.svg" alt="plus" />
                    Создать заказ
                </Button>
                <Button variant="secondary">
                    <img src="/icons/arrow-down.svg" alt="plus" />
                    Пополнить
                </Button>
            </div>
            <div className="mb-4 px-6">
                <DashboardSlider />
            </div>
            <Card className="mx-6 mb-5 gap-3 px-4 py-3">
                <div className="flex items-center justify-between">
                    <Title className="font-medium text-primary">Активные</Title>
                    <Text className="font-medium text-gray">Все</Text>
                </div>
                <div className="flex border-b border-gray pb-3">
                    <img className="mr-4" src="/icons/status/created.svg" />
                    <div>
                        <Title className="font-medium text-primary">Parsing Telegram</Title>
                        <Text fontSize={13} className="font-medium text-gray">
                            Заказ создан
                        </Text>
                    </div>
                    <Text fontSize={13} as="span" className="ml-auto font-medium text-gray">
                        00.12.53
                    </Text>
                </div>
                <div className="flex border-b border-gray pb-3">
                    <img className="mr-4" src="/icons/status/created.svg" />
                    <div>
                        <Title className="font-medium text-primary">Parsing Telegram</Title>
                        <Text fontSize={13} className="font-medium text-gray">
                            Заказ создан
                        </Text>
                    </div>
                    <Text fontSize={13} as="span" className="ml-auto font-medium text-gray">
                        00.12.53
                    </Text>
                </div>
            </Card>
        </main>
    );
};
