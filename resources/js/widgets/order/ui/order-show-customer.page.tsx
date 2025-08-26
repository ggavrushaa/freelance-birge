import { Job } from '@/entities/job';
import { OrderTab } from '@/entities/order';
import { UserPreviewCard } from '@/entities/user';
import { ExpandableText } from '@/shared/components/expandable-text';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import classNames from 'classnames';
import clsx from 'clsx';
import { useState } from 'react';

const mockUser = {
    id: 1,
    username: 'Andrew',
    rating: 4.9,
    is_premium: true,
    is_top_rated: true,
};

type OrderShowFreelancePageProps = {
    order: Job;
};

export const OrderShowCustomerPage = (props: OrderShowFreelancePageProps) => {
    const { categories } = usePageProps();
    const { order } = props;
    const [activeTab, setActiveTab] = useState<'responded' | 'suggestion'>('responded');

    const handleClickTab = (name: 'responded' | 'suggestion') => {
        setActiveTab(name);
    };

    const getCategoryName = (categoryId: number) => {
        return categories.find((category) => category.id === categoryId)?.name;
    };

    return (
        <section className="flex-1 flex-col">
            <div className="bg-[#efeff4] p-6 pt-25">
                <div className="mb-4">
                    {order.photo && (
                        <div className="relative">
                            <img
                                className="h-48 w-full rounded-tl-xl rounded-tr-xl object-cover"
                                src={order.photo}
                            />
                            <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                                {Boolean(order.premium_mode) && <Badge variant="gray">Pro</Badge>}
                                {Boolean(order.express_mode) && (
                                    <Badge variant="gray">Экспресс-режим</Badge>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex items-center justify-between gap-1 bg-[#fff] px-4 py-3',
                            order.photo ? 'rounded-br-lg rounded-bl-lg' : 'rounded-lg',
                        )}
                    >
                        <h2 className="title-4 text-17 text-500">{order.name}</h2>
                        <span className="title-4 text-17 text-500 text-accent">{order.price}$</span>
                    </div>
                </div>
                <Link href="/profile">
                    <UserPreviewCard
                        user={order.author}
                        rightAddon={<img className="ml-auto" src="/icons/arrow-right.svg" />}
                        className="mb-4"
                    />
                </Link>
                <div className="mb-4 border-input bg-white px-4 py-3">
                    <ExpandableText text={order.description} />
                    <div className="flex items-center justify-between">
                        <p className="text-15 text-500 text-gray">Срок</p>
                        <span className="text-17 text-accent">
                            {getDayLabel(Number(order.terms))}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-15 text-500 text-gray">Категории</p>
                        <span className="text-17 text-accent">
                            {getCategoryName(order.category_id)}
                        </span>
                    </div>
                </div>
                <Card className="mt-4 mb-4 grid grid-cols-2 gap-0 p-1">
                    <OrderTab
                        onClick={() => handleClickTab('responded')}
                        isActive={activeTab === 'responded'}
                        title="Откликнулись"
                        count={null}
                    />
                    <OrderTab
                        onClick={() => handleClickTab('suggestion')}
                        isActive={activeTab === 'suggestion'}
                        title="Предложение"
                        count={null}
                    />
                </Card>
                <div className="flex flex-col gap-2">
                    <UserPreviewCard
                        user={mockUser as unknown as User}
                        rightAddon={
                            <Text fontSize={13} className="ml-auto self-baseline">
                                5 мин. назад
                            </Text>
                        }
                    />
                    <UserPreviewCard
                        user={mockUser as unknown as User}
                        rightAddon={
                            <Text fontSize={13} className="ml-auto self-baseline">
                                5 мин. назад
                            </Text>
                        }
                    />
                    <UserPreviewCard
                        user={mockUser as unknown as User}
                        rightAddon={
                            <Text fontSize={13} className="ml-auto self-baseline">
                                5 мин. назад
                            </Text>
                        }
                    />
                    <UserPreviewCard
                        user={mockUser as unknown as User}
                        rightAddon={
                            <Text fontSize={13} className="ml-auto self-baseline">
                                5 мин. назад
                            </Text>
                        }
                    />
                </div>
            </div>
            <div className={classNames('grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12')}>
                <Button onClick={() => router.get(ROUTES.customer.job.edit(order.id))}>
                    Изменить
                </Button>
                <Button onClick={() => {}}>Архивировать</Button>
            </div>
        </section>
    );
};
