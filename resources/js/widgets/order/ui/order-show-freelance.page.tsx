import { Gig } from '@/entities/gig';
import { OrderTab } from '@/entities/order';
import { TariffSwitcher } from '@/entities/tariff';
import { UserPreviewCard } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
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


interface OrderShowFreelancePageProps {
    order: Gig;
}

export const OrderShowFreelancePage = (props: OrderShowFreelancePageProps) => {
    const [activeTab, setActiveTab] = useState<'liked' | 'ordered'>('liked');

    const handleClickTab = (name: 'liked' | 'ordered') => {
        setActiveTab(name);
    };
    const { order } = props;

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
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex items-center justify-between gap-1 bg-[#fff] px-4 py-3',
                            order.photo ? 'rounded-br-lg rounded-bl-lg' : 'rounded-lg',
                        )}
                    >
                        <h2 className="title-4 text-17 text-500">{order.name}</h2>
                    </div>
                </div>
                <Link href="/profile" className="mb-4">
                    <UserPreviewCard
                        user={order.freelancer}
                        rightAddon={<img className="ml-auto" src="/icons/arrow-right.svg" />}
                        className="mb-4.5"
                    />
                </Link>
                {order.tariffs.length > 0 && <TariffSwitcher tariffs={order.tariffs} />}
                <Card className="mt-4 mb-4 grid grid-cols-2 gap-0 p-1">
                    <OrderTab
                        onClick={() => handleClickTab('liked')}
                        isActive={activeTab === 'liked'}
                        title="Лайкнули"
                        count={null}
                    />
                    <OrderTab
                        onClick={() => handleClickTab('ordered')}
                        isActive={activeTab === 'ordered'}
                        title="Заказали"
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
                <Button onClick={() => router.get(ROUTES.freelance.gig.edit(order.id))}>
                    Изменить
                </Button>
                <Button onClick={() => {}}>Архивировать</Button>
            </div>
        </section>
    );
};
