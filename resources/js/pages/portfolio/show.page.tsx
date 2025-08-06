import { Portfolio } from '@/entities/portfolio';
import { ROUTES } from '@/shared/config/routes';
import { useVisibility } from '@/shared/hooks/use-visibility';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Avatar } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { truncateText } from '@/shared/utils/truncate-text';
import { SharedData } from '@/types';
import { Link, router } from '@inertiajs/react';
import clsx from 'clsx';
import { ReactNode } from 'react';

type PortfolioShowPageProps = SharedData & {
    portfolio: Portfolio;
};

const MAX_DESCRIPTION_LENGTH = 140;

const PortfolioShowPage = (props: PortfolioShowPageProps) => {
    const {
        auth: { user },
        portfolio,
    } = props;
    const description = useVisibility();

    const handleClickEdit = () => {
        router.visit(ROUTES.portfolio.edit(portfolio.id));
    };

    const handleClickArchive = () => {
        // router.post(ROUTES.customer.job.publish(job.id));
    };

    return (
        <>
            <section className="flex-1 bg-[#efeff4] p-6 pt-25">
                <div className="mb-4">
                    {portfolio.image && (
                        <div className="relative">
                            <img
                                className="h-48 w-full rounded-tl-xl rounded-tr-xl object-cover"
                                src={portfolio.image}
                            />
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex items-center justify-between gap-1 bg-[#fff] px-4 py-3',
                            portfolio.image ? 'rounded-br-lg rounded-bl-lg' : 'rounded-lg',
                        )}
                    >
                        <h2 className="title-4 text-17 text-500">{portfolio.title}</h2>
                        <span className="title-4 text-17 text-500 text-accent">
                            {portfolio.price}$
                        </span>
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
                <div className="border-input bg-white px-4 py-3">
                    <p onClick={description.toggle}>
                        {description.isVisible
                            ? portfolio.description
                            : truncateText(portfolio.description, MAX_DESCRIPTION_LENGTH)}
                        &nbsp;
                        {MAX_DESCRIPTION_LENGTH < portfolio.description.length && (
                            <span className="text-15 text-500 text-accent">
                                {description.isVisible ? 'Скрыть' : 'Еще'}
                            </span>
                        )}
                    </p>
                </div>
            </section>
            <div className="grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12">
                <Button onClick={handleClickEdit}>Изменить</Button>
                <Button onClick={handleClickArchive}>Архивировать</Button>
            </div>
        </>
    );
};

PortfolioShowPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default PortfolioShowPage;
