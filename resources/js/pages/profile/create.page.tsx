import { Language } from '@/entities/language';
import { Skill } from '@/entities/skill';
import { CreateProfileForm } from '@/features/profile/create-profile';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';

type ProfileCreatePage = SharedData & {
    languages: Language[];
    skills: Skill[];
};

const ProfileCreatePage = (props: ProfileCreatePage) => {
    const { languages, skills } = props;
    return (
        <main className="min-h-[100svh] px-6 pt-20 pb-12">
            <div className="mb-6 flex flex-col items-center">
                <img src="/images/book.png" />
                <Title fontSize={34} className="font-semibold">
                    Ваша информация
                </Title>
                <Text className="max-w-[286px] text-center">
                    Укажите данные о себе, навыках и языках — так вас легче найдут заказчики
                </Text>
            </div>
            <CreateProfileForm languages={languages} skills={skills} />
        </main>
    );
};

export default ProfileCreatePage;
