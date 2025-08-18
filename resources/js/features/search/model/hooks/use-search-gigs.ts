import { useSearchParams } from '@/shared/hooks/use-search-params';
import { useMutation } from '@tanstack/react-query';
import { searchApi } from '../../api/search-api';

interface UseSearchGigsArgs {
    search: string;
    filters?: Record<string, unknown>;
}

export const useSearchGigs = () => {
    const searchParams = useSearchParams();
    return useMutation({
        mutationFn: (args: UseSearchGigsArgs) => {
            const subCategoryId = searchParams.params.get('subCategoryId');
            return searchApi.getGigs({
                search: args.search,
                ...(subCategoryId ? { sub_category_id: subCategoryId } : {}),
                ...(args.filters || {}),
            });
        },
    });
};
