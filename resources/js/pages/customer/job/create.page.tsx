import { CreateJobForm } from '@/features/customer/job/create-job';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { ReactNode } from 'react';

const CustomerJobCreatePage = () => {
    return <CreateJobForm />;
};

CustomerJobCreatePage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        {page}
    </LayoutWithNavbar>
);

export default CustomerJobCreatePage;
