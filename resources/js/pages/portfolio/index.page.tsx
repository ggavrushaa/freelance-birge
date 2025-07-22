import { Portfolio, PortfolioCard } from '@/entities/portfolio';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Title } from '@/shared/ui/title';
import { router } from '@inertiajs/react';
import classNames from 'classnames';
import { useState } from 'react';

type PortfolioIndexPageProps = ShareData & {
    portfolios: Portfolio[];
};

export const PORTFOLIO_TABS = [
    { key: 'portfolio', label: 'Портфолио' },
    { key: 'archived', label: 'Архив' },
] as const;

export type PortfolioTabKey = (typeof PORTFOLIO_TABS)[number]['key'];

const PortfolioIndexPage = (props: PortfolioIndexPageProps) => {
    const { portfolios } = props;
    const [activeTab, setActiveTab] = useState<PortfolioTabKey>('portfolio');

    const handleClickTab = (value: PortfolioTabKey) => {
        if (value !== activeTab) {
            setActiveTab(value);
        }
    };

    const handleClickAddButton = () => {
        router.get(ROUTES.portfolio.create);
    };

    return (
        <>
            <main className="flex-1 bg-[#efeff4] px-6 pt-25">
                <Card className="mb-4.5 grid grid-cols-2 gap-1 p-1">
                    {PORTFOLIO_TABS.map((tab) => (
                        <Title
                            key={tab.key}
                            fontSize={15}
                            onClick={() => handleClickTab(tab.key)}
                            className={classNames(
                                'rounded-[8px] py-3 text-center font-bold transition-all',
                                {
                                    'bg-primary text-[#fff]': activeTab === tab.key,
                                },
                            )}
                        >
                            {tab.label}
                        </Title>
                    ))}
                </Card>
                <div className="flex flex-col gap-2 pb-4">
                    {portfolios.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            title={portfolio.title}
                            description={portfolio.description}
                            imageUrl={portfolio.image}
                            price={portfolio.price}
                        />
                    ))}
                </div>
            </main>
            <footer className="px-6 pt-6 pb-12">
                <Button onClick={handleClickAddButton} className="w-full">
                    Добавить
                </Button>
            </footer>
        </>
    );
};

export default PortfolioIndexPage;
