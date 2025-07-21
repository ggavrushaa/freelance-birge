import { CreateProfileForm } from '@/features/profile/create-profile';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

const ProfileCreatePage = () => {
    return (
        <main className="min-h-[100svh] px-6 pt-20 pb-12">
            <div className="flex flex-col items-center mb-6">
                <img src="/images/book.png" />
                <Title fontSize={34} className="font-semibold">
                    Ваша информация
                </Title>
                <Text className="max-w-[286px] text-center">
                    Укажите данные о себе, навыках и языках — так вас легче найдут заказчики
                </Text>
            </div>
            <CreateProfileForm />
        </main>
    );
};

export default ProfileCreatePage;
