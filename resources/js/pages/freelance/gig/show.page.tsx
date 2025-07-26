import { Gig } from '@/entities/gig';
import { TariffSwitcher } from '@/entities/tariff';
import { ROUTES } from '@/shared/config/routes';
import { Avatar } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { SharedData } from '@/types';
import { Link, router } from '@inertiajs/react';
import clsx from 'clsx';

type FreelanceGigShowPageProps = SharedData & {
    gig: Gig;
};

const FreelanceGigShowPage = (props: FreelanceGigShowPageProps) => {
    const {
        gig,
        auth: { user },
    } = props;

    const handleClickEdit = () => {
        router.get(ROUTES.freelance.gig.edit(gig.id));
    };

    const handleClickPublish = () => {
        router.get("/freelance/dashboard");
    };

    return (
        <main className="flex min-h-[100svh] flex-col bg-[#efeff4]">
            <section className="flex-1 p-6 pt-25">
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
                <Link
                    href="/profile"
                    className="mb-4 flex items-center rounded-xl bg-white px-4 py-3"
                >
                    <Avatar className="bg-avatar mr-2.5 h-10 w-10 rounded-full"></Avatar>
                    <div className="flex flex-col">
                        <div className="mb-[2px] flex items-center">
                            <p className="mr-2.5">{user.username}</p>
                            <img src="/icons/star2.svg" />
                            <span className="text-14 font-medium">4.9</span>
                            <span className="text-8 mt-1 ml-1 text-gray">(777)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Badge>Premium</Badge>
                            <Badge>Top Ratted</Badge>
                        </div>
                    </div>
                    <img className="ml-auto" src="/icons/arrow-right.svg" />
                </Link>
                {gig.tariffs.length > 0 && <TariffSwitcher tariffs={gig.tariffs} />}
            </section>
            <div className="grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12">
                <Button onClick={handleClickEdit}>Изменить</Button>
                <Button onClick={handleClickPublish}>Опубликовать</Button>
            </div>
        </main>
    );
};

export default FreelanceGigShowPage;
