import { JobCard, PaginatedJobs } from '@/entities/job';
import { JobFilters } from '@/features/customer/job/job-filters';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

type CustomerJobIndexPageProps = SharedData & {
    jobs: PaginatedJobs;
};

const CustomerJobIndexPage = (props: CustomerJobIndexPageProps) => {
    const { jobs } = props;
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(params.get('search') ?? '');
    const onChangeSearchQuery = (value: string) => {
        setSearchQuery(value);
        router.get('/customer-job', value ? { search: value } : {}, {
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <main className="flex-1 bg-[#efeff4] px-6 pt-29">
            <JobFilters searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />
            <div className="mt-3 flex flex-col gap-3">
                {jobs.data.map((job) => (
                    <Link href={`/customer-job/${job.id}`} key={job.id}>
                        <JobCard
                            imageUrl={job.photo}
                            categoryName={job.category.name}
                            price={job.price}
                        />
                    </Link>
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
