import { Gig, GigSimilarCard } from '@/entities/gig';
import { ReviewList } from '@/entities/review';
import { TariffSwitcher } from '@/entities/tariff';
import { UserPreviewCard } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';

interface GigGuestViewProps {
    gig: Gig;
}

export const GigGuestView = (props: GigGuestViewProps) => {
    const { gig } = props;
    return (
        <>
            <section className="flex-1 bg-[#efeff4] p-6 pt-25">
                <div className="mb-4">
                    {gig.photo && (
                        <div className="relative">
                            <img
                                className="h-48 w-full rounded-tl-xl rounded-tr-xl object-cover"
                                src={gig.photo}
                            />
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex items-center justify-between gap-1 bg-[#fff] px-4 py-3',
                            gig.photo ? 'rounded-br-lg rounded-bl-lg' : 'rounded-lg',
                        )}
                    >
                        <h2 className="title-4 text-17 text-500">{gig.name}</h2>
                    </div>
                </div>
                <Link href="/profile" className="mb-4">
                    <UserPreviewCard
                        user={gig.freelancer}
                        rightAddon={<img className="ml-auto" src="/icons/arrow-right.svg" />}
                    />
                </Link>
                {gig.tariffs.length > 0 && <TariffSwitcher tariffs={gig.tariffs} />}
                <ReviewList className="mt-3 mb-3" />
                <Title className="mb-3 font-medium">Похожие</Title>
                <div className="scrollbar-hide flex flex-row gap-2 overflow-auto">
                    <GigSimilarCard
                        rating={0}
                        title="Draw furry discord or telegtam stickers pack SKDFLDK"
                        price={35}
                        className="w-[167px] shrink-0"
                    />
                    <GigSimilarCard
                        rating={0}
                        title="Draw furry discord or telegtam stickers pack SKDFLDK"
                        price={35}
                        className="w-[167px] shrink-0"
                    />
                    <GigSimilarCard
                        rating={0}
                        title="Draw furry discord or telegtam stickers pack SKDFLDK"
                        price={35}
                        className="w-[167px] shrink-0"
                    />
                </div>
            </section>
            <div className="grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12">
                <Button>
                    <img src="/icons/chat.svg" />
                    Чат
                </Button>
                <Button>
                    <img src="/icons/payment.svg" />
                    Оплата
                </Button>
            </div>
        </>
    );
};
