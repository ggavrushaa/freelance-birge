import { Job } from '@/entities/job';
import { EditJobForm } from '@/features/customer/job/edit-job';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { ReactNode } from 'react';

type CustomerJobEditPageProps = {
    job: Job;
};

const CustomerJobEditPage = (props: CustomerJobEditPageProps) => {
    const { job } = props;
    return <EditJobForm job={job} />;
};

CustomerJobEditPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default CustomerJobEditPage;
