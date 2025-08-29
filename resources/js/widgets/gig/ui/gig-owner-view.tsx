import { Gig } from '@/entities/gig';
import { TariffSwitcher } from '@/entities/tariff';
import { UserPreviewCard } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Link, router } from '@inertiajs/react';
import classNames from 'classnames';
import clsx from 'clsx';

interface GigOwnerViewProps {
    gig: Gig;
}

export const GigOwnerView = (props: GigOwnerViewProps) => {
    const { gig } = props;

    const handleClickEdit = () => {
        router.get(ROUTES.freelance.gig.edit(gig.id));
    };

    const handleClickPublish = () => {
        router.post(ROUTES.freelance.gig.published(gig.id));
    };

    const isActiveGig = gig.is_active;

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
                <Link href="/profile" className="mb-4 flex items-center rounded-xl bg-white">
                    <UserPreviewCard
                        user={gig.freelancer}
                        rightAddon={<img className="ml-auto" src="/icons/arrow-right.svg" />}
                    />
                </Link>
                {gig.tariffs.length > 0 && <TariffSwitcher tariffs={gig.tariffs} />}
            </section>
            <div
                className={classNames('grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12', {
                    'grid-cols-1!': isActiveGig,
                })}
            >
                <Button onClick={handleClickEdit}>Изменить</Button>
                {!isActiveGig && <Button onClick={handleClickPublish}>Опубликовать</Button>}
            </div>
        </>
    );
};
