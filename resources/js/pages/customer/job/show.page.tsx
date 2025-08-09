import { JobSimilarCard } from '@/entities/job';
import { ReviewList } from '@/entities/review';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { useVisibility } from '@/shared/hooks/use-visibility';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { truncateText } from '@/shared/utils/truncate-text';
import { CustomerJob, SharedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Avatar } from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { ReactNode } from 'react';

type CustomerJobShowPageProps = SharedData & {
    job: CustomerJob;
};

const MAX_DESCRIPTION_LENGTH = 140;

const CustomerJobShowPage = (props: CustomerJobShowPageProps) => {
    const {
        auth: { user },
    } = usePageProps();
    const { job, categories } = props;
    const description = useVisibility();

    const getCategoryName = (categoryId:number) => {
        return categories.find((category) => category.id === categoryId)?.name;
    };

    const handleClickEdit = () => {
        router.visit(ROUTES.customer.job.edit(job.id));
    };

    const handleClickPublish = () => {
        router.post(ROUTES.customer.job.publish(job.id));
    };

    const isMyJob = job.author_id === user.id;

    console.log(getCategoryName(job.category_id));

    return (
        <>
            <section className="flex-1 bg-[#efeff4] p-6 pt-25">
                <div className="mb-4">
                    {job.photo && (
                        <div className="relative">
                            <img
                                className="h-48 w-full rounded-tl-xl rounded-tr-xl object-cover"
                                src={job.photo}
                            />
                            <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                                {Boolean(job.premium_mode) && <Badge variant="gray">Pro</Badge>}
                                {Boolean(job.express_mode) && (
                                    <Badge variant="gray">Экспресс-режим</Badge>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex items-center justify-between gap-1 bg-[#fff] px-4 py-3',
                            job.photo ? 'rounded-br-lg rounded-bl-lg' : 'rounded-lg',
                        )}
                    >
                        <h2 className="title-4 text-17 text-500">{job.name}</h2>
                        <span className="title-4 text-17 text-500 text-accent">{job.price}$</span>
                    </div>
                </div>
                <div className="mb-4 flex items-center rounded-xl bg-white px-4 py-3">
                    <Avatar className="bg-avatar mr-2.5 h-10 w-10 rounded-full"></Avatar>
                    <div className="flex flex-col">
                        <div className="mb-[2px] flex items-center">
                            <p className="mr-2.5">{user.username}</p>
                            <img src="/icons/star2.svg" />
                            <span className="text-14 font-medium">{user.rating}</span>
                            <span className="text-8 mt-1 ml-1 text-gray">(777)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Badge>Premium</Badge>
                            <Badge>Top Ratted</Badge>
                        </div>
                    </div>
                    <img className="ml-auto" src="/icons/arrow-right.svg" />
                </div>
                <div className="mb-4 border-input bg-white px-4 py-3">
                    <p className="mb-2.5" onClick={description.toggle}>
                        {description.isVisible
                            ? job.description
                            : truncateText(job.description, MAX_DESCRIPTION_LENGTH)}
                        &nbsp;
                        {MAX_DESCRIPTION_LENGTH < job.description.length && (
                            <span className="text-15 text-500 text-accent">
                                {description.isVisible ? 'Скрыть' : 'Еще'}
                            </span>
                        )}
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="text-15 text-500 text-gray">Срок</p>
                        <span className="text-17 text-accent">
                            {getDayLabel(Number(job.terms))}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-15 text-500 text-gray">Категории</p>
                        <span className="text-17 text-accent">{getCategoryName(job.category_id)}</span>
                    </div>
                </div>
                {!isMyJob && <ReviewList className="mb-3" />}
                {!isMyJob && (
                    <>
                        <Title className="font-medium mb-3">Похожие</Title>
                        <div className="scrollbar-hide flex flex-row gap-2 overflow-auto">
                            <JobSimilarCard
                                title="Draw furry discord or telegtam stickers pack"
                                price={35}
                                isPremium={true}
                                categoryLable={getCategoryName(job.category_id)}
                                className="min-w-[310px]"
                            />
                            <JobSimilarCard
                                title="Draw furry discord or telegtam stickers pack"
                                price={35}
                                isPremium={true}
                                categoryLable={getCategoryName(job.category_id)}
                                className="min-w-[310px]"
                            />
                            <JobSimilarCard
                                title="Draw furry discord or telegtam stickers pack"
                                price={35}
                                isPremium={true}
                                categoryLable={getCategoryName(job.category_id)}
                                className="min-w-[310px]"
                            />
                        </div>
                    </>
                )}
            </section>
            <div className="mt-auto grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12">
                {isMyJob ? (
                    <>
                        <Button onClick={handleClickEdit}>Изменить</Button>
                        <Button onClick={handleClickPublish}>Опубликовать</Button>
                    </>
                ) : (
                    <>
                        <Button>
                            <img src="/icons/chat.svg" />
                            Чат
                        </Button>
                        <Button>
                            <img src="/icons/arrow-up.svg" />
                            Откликнуться
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

CustomerJobShowPage.layout = (page: ReactNode) => (
    <LayoutWithNavbar>
        <Head title="Profile page" />
        {page}
    </LayoutWithNavbar>
);

export default CustomerJobShowPage;
