import { useMutation } from '@tanstack/react-query';
import { searchApi } from '../../api/search-api';
import { useSearchParams } from '@/shared/hooks/use-search-params';

interface UseSearchJobsArgs {
    search: string;
    filters?: Record<string, unknown>;
}

export const useSearchJobs = () => {
    const searchParams = useSearchParams();
    const subCategoryId = searchParams.params.get("subCategoryId");
    return useMutation({
        mutationFn: (args: UseSearchJobsArgs) =>
            searchApi.getJobs({
                search: args.search,
                ...(subCategoryId ? { sub_category_id: subCategoryId } : {}),
                ...(args.filters || {}),
            }),
    });
};
