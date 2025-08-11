import { CreateGigForm } from '@/features/freelance/gig/create-gig';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

const FreelanceGigCreatePage = () => {
    return (
        <section className="bg-[#efeff4] px-6 pt-25 pb-12 flex-1">
            <CreateGigForm />
        </section>
    );
};

FreelanceGigCreatePage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Jobs page" />
        {page}
    </LayoutWithNavbar>
);

export default FreelanceGigCreatePage;
