import { Language } from '@/entities/language';
import { Profile } from '@/entities/profile';
import { Skill } from '@/entities/skill';
import { UserCard, UserCardContent, UserCardHeader } from '@/entities/user';
import { LogoutButton } from '@/features/auth';
import { BadgeList } from '@/shared/components/badge-list';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/shared/ui/card';
import { CollapsableText } from '@/shared/ui/collapsable-text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ReactNode } from 'react';

type ProfileShowPageProps = SharedData & {
    profile: Profile;
};

const ProfileShowPage = (props: ProfileShowPageProps) => {
    const {
        profile,
        auth: { user },
    } = props;

    const handleClickArrow = () => {
        router.get(ROUTES.profile.edit(profile.id));
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
                        rating={user.rating}
                        ordersCount={user.orders_count}
                        completedOrdersCount={user.completed_orders_count}
                    />
                }
                className="mb-6"
            />
            <Link href="/portfolio/" className="mb-4.5 block">
                <Card className="btn-press flex flex-row items-center justify-between px-4 py-3">
                    <Title color="black" className="font-medium">
                        Портфолио
                    </Title>
                    <img className="h-4.5 w-4.5" src="/icons/arrow-right.svg" />
                </Card>
            </Link>
            <Card className="mb-4.5 gap-0 p-4">
                <Title className="font-medium">Обо мне</Title>
                <CollapsableText text={profile.description} className="text-[13px] text-gray" />
                {profile.languages && profile.languages.length > 0 && (
                    <BadgeList
                        leftIcon={<img src="/icons/language.svg" />}
                        items={profile.languages}
                        getItemLabel={(language: Language) => language.name}
                        className="mb-4"
                    />
                )}
                {profile.skills && profile.skills.length > 0 && (
                    <>
                        <Title className="mb-1 block font-medium">Навыки</Title>
                        <BadgeList
                            items={profile.skills}
                            getItemLabel={(skill: Skill) => skill.name}
                        />
                    </>
                )}
            </Card>
            <Title fontSize={20} className="mb-3 font-medium">
                Управление аккаунтом
            </Title>
            <Card className="btn-press mb-4.5 flex flex-row items-center justify-between px-4 py-3">
                <Title className="font-medium">Пользовательское соглашение</Title>
                <img className="h-4.5 w-4.5" src="/icons/arrow-right.svg" />
            </Card>
            <LogoutButton />
        </div>
    );
};

ProfileShowPage.layout = (page: ReactNode) => (
    <>
        <Head title="Profile page" />
        {page}
    </>
);

export default ProfileShowPage;
