import { Profile, ProfileNavItem } from '@/entities/profile';
import { UserCard, UserCardContent, UserCardHeader } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Card } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { SharedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

type ProfileShowPageProps = SharedData & {
    profile: Profile | null;
};

const ProfileShowPage = (props: ProfileShowPageProps) => {
    const {
        profile,
        auth: { user },
    } = props;

    const handleClickArrow = () => {
        if (profile) {
            console.log('ture');
        } else {
            router.get(ROUTES.profile.create);
        }
    };

    return (
        <div className="flex-1 bg-[#efeff4] px-6 pt-20">
            <UserCard
                header={
                    <UserCardHeader
                        userName={user.username}
                        rightAddon={
                            <img
                                onClick={handleClickArrow}
                                src="/icons/arrow-right.svg"
                                className="btn-press ml-auto"
                            />
                        }
                    />
                }
                content={
                    <UserCardContent
                        ordersCount={user.orders_count}
                        completedOrdersCount={user.completed_orders_count}
                    />
                }
                className="mb-6"
            />
            <Card className="mb-4.5 gap-0 px-4 py-0 [&>div:last-of-type]:border-0">
                <ProfileNavItem
                    imageUrl="/icons/profile/stats.svg"
                    text="Статистика"
                    rightAddon={<img src="/icons/profile/arrow.svg" className="ml-auto" />}
                />
                <ProfileNavItem
                    imageUrl="/icons/profile/wallet.svg"
                    text="Кошелек"
                    rightAddon={<img src="/icons/profile/arrow.svg" className="ml-auto" />}
                />
            </Card>
            <Card className="mb-4.5 gap-0 px-4 py-0 [&>div:last-of-type]:border-0">
                <ProfileNavItem
                    imageUrl="/icons/profile/friend.svg"
                    text="Пригласи друга"
                    rightAddon={<img src="/icons/profile/arrow.svg" className="ml-auto" />}
                />
            </Card>
            <Card className="mb-4.5 gap-0 px-4 py-0 [&>div:last-of-type]:border-0">
                <ProfileNavItem
                    imageUrl="/icons/profile/riki.svg"
                    text="Riki Premium"
                    rightAddon={<img src="/icons/profile/arrow.svg" className="ml-auto" />}
                />
                <ProfileNavItem
                    imageUrl="/icons/profile/present.svg"
                    text="Riki подарок"
                    rightAddon={<img src="/icons/profile/arrow.svg" className="ml-auto" />}
                />
            </Card>
            <Card className="mb-4.5 gap-0 px-4 py-0 [&>div:last-of-type]:border-0">
                <ProfileNavItem
                    imageUrl="/icons/profile/mode.svg"
                    text="Режим фрилансера"
                    rightAddon={<Switch className="ml-auto" />}
                />
            </Card>
            <Card className="mb-4.5 gap-0 px-4 py-0 [&>div:last-of-type]:border-0">
                <ProfileNavItem imageUrl="/icons/profile/folder.svg" text="Добавить каналы" />
                <ProfileNavItem imageUrl="/icons/profile/support.svg" text="Поддержка" />
                <ProfileNavItem imageUrl="/icons/profile/faq.svg" text="Riki FAQ" />
            </Card>
        </div>
    );
};

ProfileShowPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Profile page" />
        {page}
    </LayoutWithNavbar>
);

export default ProfileShowPage;
