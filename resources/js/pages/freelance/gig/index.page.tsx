import { GigCard, PaginatedGigs } from '@/entities/gig';
import { JobFilters } from '@/features/customer/job/job-filters';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

type FreelanceGigIndexPageProps = SharedData & {
    gigs: PaginatedGigs;
};

const FreelanceGigIndexPage = (props: FreelanceGigIndexPageProps) => {
    const { gigs } = props;
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(params.get('search') ?? '');

    const onChangeSearchQuery = (value: string) => {
        setSearchQuery(value);
        router.get('/freelance-gig', value ? { search: value } : {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <main className="flex-1 bg-[#efeff4] px-6 pt-29">
            <JobFilters searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />
            <div className="mt-3 flex flex-col gap-3">
                {gigs.data.map((gig) => (
                    <Link key={gig.id} href={`/freelance-gig/${gig.id}`}>
                        <GigCard imageUrl={gig.photo} categoryName={gig.category.name} />
                    </Link>
                ))}
            </div>
        </main>
    );
};

FreelanceGigIndexPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Gigs page" />
        {page}
    </LayoutWithNavbar>
);

export default FreelanceGigIndexPage;
