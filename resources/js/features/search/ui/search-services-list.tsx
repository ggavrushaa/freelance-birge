import { Category, CategoryCard } from '@/entities/category';
import { Title } from '@/shared/ui/title';

interface SearchServicesListProps {
    categories: Category[];
    onClick: (categoryId: number) => void;
}

export const SearchServicesList = (props: SearchServicesListProps) => {
    const { categories, onClick } = props;
    return (
        <>
            <Title className="mb-3 font-medium">Услуги</Title>
            <div className="grid grid-cols-3 gap-1.5">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageUrl={category.icon as string}
                        color={category.color as string}
                        onClick={() => onClick(category.id)}
                        className="flex size-[110px] flex-col justify-between rounded-xl p-2.5 [&_img]:max-w-[50px]"
                    />
                ))}
            </div>
        </>
    );
};
