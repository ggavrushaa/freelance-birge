import { Category, CategoryCard } from '@/entities/category';
import { ROUTES } from '@/shared/config/routes';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface DashboardCategoriesListProps {
    additionalCategoryCard: ReactNode;
    categories: Category[];
}

export const DashboardCategoriesList = (props: DashboardCategoriesListProps) => {
    const { categories, additionalCategoryCard } = props;

    const handleClickCategory = (categoryId: number) => {
        router.get(ROUTES.searchShow(categoryId));
    };

    const handleClickAll = () => {
        router.get(ROUTES.search);
    };

    return (
        <>
            <div className="mb-3 flex items-center justify-between px-6">
                <Title>Популярные услуги</Title>
                <Text
                    onClick={handleClickAll}
                    className="cursor-pointer font-medium text-gray select-none"
                >
                    Все
                </Text>
            </div>
            <ul className="scrollbar-hide mb-3 flex gap-3 overflow-auto px-6">
                {additionalCategoryCard}
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageUrl={category.icon as string}
                        color={category.color as string}
                        onClick={() => handleClickCategory(category.id)}
                        className="flex size-[100px] min-w-[100px] flex-col justify-between rounded-[10px] p-2.5"
                    />
                ))}
            </ul>
        </>
    );
};
