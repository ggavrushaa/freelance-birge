import { useRoleContext } from '@/features/role';
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '../../api/search-api';

export const useSearchSuggestions = (search: string) => {
    const { role } = useRoleContext();
    return useQuery({
        queryKey: ['suggestions', search, role],
        queryFn: () => searchApi.getSuggestions(search),
        enabled: !!search,
        staleTime: 1000 * 30,
    });
};
