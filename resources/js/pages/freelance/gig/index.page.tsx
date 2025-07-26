import { GigCard, PaginatedGigs } from '@/entities/gig';
import { JobFilters } from '@/features/customer/job/job-filters';
import { SharedData } from '@/types';
import { useState } from 'react';

type FreelanceGigIndexPageProps = SharedData & {
    gigs: PaginatedGigs;
};

const FreelanceGigIndexPage = (props: FreelanceGigIndexPageProps) => {
    const { gigs } = props;
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(params.get('search') ?? '');

    const onChangeSearchQuery = (value: string) => {
        setSearchQuery(value);
        // router.get('/customer-job', value ? { search: value } : {}, {
        //     replace: true,
        //     preserveScroll: true,
        //     preserveState: true,
        // });
    };

    return (
        <main className="flex-1 bg-[#efeff4] px-6 pt-29">
            <JobFilters searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />
            <div className="mt-3 flex flex-col gap-3">
                {gigs.data.map((gig) => (
                    <GigCard imageUrl={gig.photo} categoryName={gig.category.name} />
                ))}
            </div>
        </main>
    );
};

export default FreelanceGigIndexPage;
