import { Language, LanguagesSelection, useLanguagesSelection } from '@/entities/language';
import { Profile } from '@/entities/profile';
import { Skill, SkillsSelection, useSkillsSelection } from '@/entities/skill';
import { UserCard, UserCardContent, UserCardHeader } from '@/entities/user';
import { LogoutButton } from '@/features/auth';
import { Card } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ChangeEvent, ReactNode, useState } from 'react';

type ProfileEditPageProps = SharedData & {
    profile: Profile;
    allLanguages: Language[];
    allSkills: Skill[];
};

export const getIds = <T extends { id: number }>(array: T[]) => {
    return array.map((item) => item.id);
};

const ProfileEditPage = (props: ProfileEditPageProps) => {
    const {
        profile,
        allLanguages,
        allSkills,
        auth: { user },
    } = props;

    const [description, setDescription] = useState(profile.description);

    const languagesSelection = useLanguagesSelection({
        initialItems: profile.languages,
        allItems: allLanguages,
    });

    const skillsSelection = useSkillsSelection({
        initialItems: profile.skills,
        allItems: allSkills,
    });

    

    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleClickClose = () => {
        const request = {
            description,
            languages: getIds(languagesSelection.selectedItems),
            skills: getIds(skillsSelection.selectedItems),
        };
        router.patch(`/profile/${profile.id}`, request);
    };

    return (
        <div className="flex-1 bg-[#efeff4] px-6 pt-20 pb-20">
            <UserCard
                header={
                    <UserCardHeader
                        userName={user.username}
                        rightAddon={
                            <img
                                onClick={handleClickClose}
                                src="/icons/close.svg"
                                className="btn-press ml-auto"
                            />
                        }
                        className="[&>div]:blur-[2px]"
                    />
                }
                content={
                    <UserCardContent
                        rating={user.rating}
                        ordersCount={user.orders_count}
                        completedOrdersCount={user.completed_orders_count}
                        className="blur-[2px]"
                    />
                }
                className="mb-6"
            />
            <Card className="mb-4.5 gap-0 p-4">
                <div className="mb-4">
                    <Title className="mb-1 font-medium">Обо мне</Title>
                    <Textarea
                        value={description}
                        maxLength={240}
                        className="h-50 text-[13px]!"
                        onChange={handleChangeDescription}
                    />
                </div>
                <div className="mb-3 flex items-start gap-1">
                    <img src="/icons/language.svg" className="mt-1" />
                    <LanguagesSelection
                        selectedLanguages={languagesSelection.selectedItems}
                        availableLanguages={languagesSelection.availableItems}
                        onChange={languagesSelection.add}
                        onRemove={languagesSelection.remove}
                    />
                </div>
                <Title className="mb-1 block font-medium">Навыки</Title>
                <SkillsSelection
                    selectedSkills={skillsSelection.selectedItems}
                    availableSkills={skillsSelection.availableItems}
                    onChange={skillsSelection.add}
                    onRemove={skillsSelection.remove}
                />
            </Card>
            <Title fontSize={20} className="mb-3 font-medium blur-[2px]">
                Управление аккаунтом
            </Title>
            <Card className="btn-press mb-4.5 flex flex-row items-center justify-between px-4 py-3 blur-[2px] pointer-events-none">
                <Title className="font-medium">Пользовательское соглашение</Title>
                <img className="h-4.5 w-4.5" src="/icons/arrow-right.svg" />
            </Card>
            <div className="pointer-events-none">
                <LogoutButton className="blur-[2px]" />
            </div>
        </div>
    );
};

ProfileEditPage.layout = (page: ReactNode) => (
    <>
        <Head title="Profile page" />
        {page}
    </>
);

export default ProfileEditPage;
