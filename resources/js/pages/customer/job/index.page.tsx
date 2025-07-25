import { JobCard, PaginatedJobs } from '@/entities/job';
import { JobFilters } from '@/features/customer/job/job-filters';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

type CustomerJobIndexPageProps = SharedData & {
    jobs: PaginatedJobs;
};

const CustomerJobIndexPage = (props: CustomerJobIndexPageProps) => {
    const { jobs } = props;
    return (
        <main className="flex-1 bg-[#efeff4] px-6 pt-29">
            <JobFilters />
            <div className='mt-3 flex flex-col gap-3'>
                {jobs.data.map((job) => (
                    <JobCard imageUrl={job.photo} categoryName={job.category.name} price={job.price}/>
                ))}
            </div>
        </main>
    );
};

CustomerJobIndexPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Jobs page" />
        {page}
    </LayoutWithNavbar>
);

export default CustomerJobIndexPage;
