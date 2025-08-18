import { Job } from '@/entities/job';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { JobGuestView, JobOwnerView } from '@/widgets/job';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

type CustomerJobShowPageProps = SharedData & {
    job: Job;
};

const CustomerJobShowPage = (props: CustomerJobShowPageProps) => {
    const {
        auth: { user },
    } = usePageProps();
    const { job } = props;

    console.log(job);

    const isMyJob = job.author_id === user.id;

    if (isMyJob) {
        return <JobOwnerView job={job} />;
    }

    return <JobGuestView job={job} />;
};

CustomerJobShowPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Profile page" />
        {page}
    </LayoutWithNavbar>
);

export default CustomerJobShowPage;
