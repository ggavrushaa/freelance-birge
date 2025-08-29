import { Gig } from '@/entities/gig';
import { EditGigForm } from '@/features/freelance/gig/edit-gig';
import { editFreelanceGigSchema } from '@/features/freelance/gig/edit-gig/model/validation/edit-freelance-gig-schema';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';
import z from 'zod';

type FreelanceGigEditPageProps = SharedData & {
    gig: Gig;
};

const FreelanceGigEditPage = (props: FreelanceGigEditPageProps) => {
    const {
        gig,
        auth: { user },
    } = props;
    const formValues = {
        name: gig.name,
        premium_mode: Boolean(gig.premium_mode),
        express_mode: Boolean(gig.express_mode),
        category_id: gig.category_id,
        sub_category_id: gig.sub_category_id,
        photo: gig.photo,
    };
    const onSubmit = (data: z.infer<typeof editFreelanceGigSchema>) => {
        const { photo , ...rest} = data;
        const isNewPhoto = typeof photo !== 'string';
        router.put(ROUTES.freelance.gig.update(gig.id), {
            ...rest,
            ...(isNewPhoto && { photo }),
            user_id: user.id,
        });
    };
    return (
        <section className="bg-[#efeff4] px-6 pt-25 pb-12">
            <EditGigForm formValues={formValues} tariffs={gig.tariffs} onSubmit={onSubmit} gigId={gig.id} />
        </section>
    );
};

FreelanceGigEditPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        {page}
    </LayoutWithNavbar>
);

export default FreelanceGigEditPage;
