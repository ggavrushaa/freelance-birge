import { CategoryCard } from '@/entities/category';
import { ROUTES } from '@/shared/config/routes';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { router } from '@inertiajs/react';
import classNames from 'classnames';
import { ReactNode } from 'react';

type SearchIndexPageProps = SharedData;

const SearchIndexPage = (props: SearchIndexPageProps) => {
    const { categories } = props;

    const handleClickCategory = (categoryId: number) => {
        router.get(ROUTES.searchShow(categoryId));
    };

    return (
        <section className="flex-1 bg-[#efeff4] px-6 pt-25">
            <InputWithIcon
                placeholder="Поиск"
                renderIcon={() => <img src="/icons/search.svg" alt="search" className="mr-3" />}
                className={classNames('mb-4.5 flex-1 gap-0 rounded-xl py-2')}
            />
            <Title className="mb-3 font-medium">Услуги</Title>
            <div className="grid grid-cols-3 gap-1.5">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageUrl={category.icon as string}
                        color={category.color as string}
                        onClick={() => handleClickCategory(category.id)}
                        className="size-[110px] rounded-xl p-2.5 [&_img]:max-w-[50px] flex flex-col justify-between"
                    />
                ))}
            </div>
        </section>
    );
};

SearchIndexPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default SearchIndexPage;
