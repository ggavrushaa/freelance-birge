import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/search-api";

export const useSearchSuggestions = (search:string) => {
    return useQuery({
        queryKey: ['suggestions', search],
        queryFn: () => searchApi.getSuggestions(search),
        enabled: !!search,
        staleTime: 1000 * 30,
    });
};
