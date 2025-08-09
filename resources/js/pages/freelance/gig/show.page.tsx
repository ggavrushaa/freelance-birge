import { Gig } from '@/entities/gig';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { SharedData } from '@/types';
import { GigGuestView, GigOwnerView } from '@/widgets/gig';
import { ReactNode } from 'react';

type FreelanceGigShowPageProps = SharedData & {
    gig: Gig;
};

const FreelanceGigShowPage = (props: FreelanceGigShowPageProps) => {
    const {
        gig,
        auth: { user },
    } = props;

    const isMyGig = user.id === gig.user_id;

    if (isMyGig) {
        return <GigOwnerView gig={gig} />;
    }

    return <GigGuestView gig={gig} />;
};

FreelanceGigShowPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default FreelanceGigShowPage;
