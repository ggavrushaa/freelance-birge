import { Profile } from '@/entities/profile';
import { CreatePortfolioForm } from '@/features/portfolio/create-portfolio';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

type PortfolioCreatePageProps = ShareData & {
    profile: Profile;
};

const PortfolioCreatePage = (props: PortfolioCreatePageProps) => {
    const { profile } = props;
    return (
        <main className="min-h-[100svh] px-6 pt-20 pb-12">
            <div className="mb-6 flex flex-col items-center">
                <img src="/images/portfolio.png" className="mb-6" />
                <Title fontSize={34} className="mb-3 font-semibold">
                    Портфолио
                </Title>
                <Text className="max-w-[302px] text-center">
                    Добавьте портфолио — заказчикам будет проще оценить ваши работы и выбрать вас
                </Text>
            </div>
            <CreatePortfolioForm profileId={profile.id} />
        </main>
    );
};

export default PortfolioCreatePage;
