import { Portfolio } from '@/entities/portfolio';
import { Profile } from '@/entities/profile';
import { EditPortfolioForm, EditPortfolioRequest } from '@/features/portfolio/edit-portfolio';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

type PortfolioEditPageProps = SharedData & {
    portfolio: Portfolio;
    profile: Profile;
};

const PortfolioEditPage = (props: PortfolioEditPageProps) => {
    const { portfolio, profile } = props;
    const formValues = {
        title: portfolio.title,
        description: portfolio.description,
        image: portfolio.image,
        category_id: portfolio.category_id,
        sub_category_id: portfolio.sub_category_id,
        price: Number(portfolio.price),
        terms: portfolio.terms,
    };
    const onCancel = () => {
        history.back();
    };
    const onSubmit = (data: EditPortfolioRequest) => {
        const { image, ...rest } = data;
        router.patch(ROUTES.portfolio.update(portfolio.id), {
            ...rest,
            ...(image !== portfolio.image && { image }),
            profile_id: profile.id,
        });
    };
    return (
        <main className="min-h-[100svh] px-6 pt-20 pb-12">
            <EditPortfolioForm defaultValues={formValues} onSubmit={onSubmit} onCancel={onCancel} />
        </main>
    );
};

PortfolioEditPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default PortfolioEditPage;
