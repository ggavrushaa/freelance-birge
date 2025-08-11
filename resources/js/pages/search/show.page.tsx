import { Category, SubCategory } from '@/entities/category';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { ReactNode } from 'react';

type SearchShowPageProps = SharedData & {
    category: Category;
    subCategories: SubCategory[];
};

const SearchShowPage = (props: SearchShowPageProps) => {
    const { category, subCategories = [] } = props;
    return (
        <section className="flex-1 bg-[#efeff4] px-6 pt-20">
            {category.icon && <img src={category.icon} className="mx-auto mb-4.5 w-[140px]" />}
            <Title fontSize={20} className='text-center font-semibold mb-3'>{category.name}</Title>
            <div className="flex flex-col gap-2">
                {subCategories.map((subCategory) => (
                    <div className="flex items-center justify-between">
                        <Title className="font-medium">{subCategory.name}</Title>
                        <img src="/categories/arrow.svg" />
                    </div>
                ))}
            </div>
        </section>
    );
};

SearchShowPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default SearchShowPage;
