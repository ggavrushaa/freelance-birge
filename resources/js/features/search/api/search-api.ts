import { api } from '@/shared/api';
import { ROUTES } from '@/shared/config/routes';
import { SearchApi } from '../model/types/search-api';

export const searchApi: SearchApi = {
    getJobs: async (params) => {
        try {
            const resp = await api.post('search/jobs', params);
            return resp.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    getGigs: async (params) => {
        try {
            const resp = await api.post('search/gigs', params);
            return resp.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    getSuggestions: async (searchText: string) => {
        try {
            const resp = await api.post(ROUTES.searchSuggestions, {
                search: searchText,
            });
            return resp.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
};
