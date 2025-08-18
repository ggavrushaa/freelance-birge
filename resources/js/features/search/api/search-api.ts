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
            const resp = await api.post('/search/gigs', params);
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
    getJobsSuggestions: async (searchText: string) => {
        try {
            const resp = await api.get('search/similar-jobs', {
                params: {
                    search: searchText,
                },
            });
            return resp.data.suggestions;
        } catch (error) {
            console.error(error);
        }
    },
    getGigsSuggestions: async (searchText: string) => {
        try {
            const resp = await api.get('search/similar-gigs', {
                params: {
                    search: searchText,
                },
            });
            return resp.data.suggestions;
        } catch (error) {
            console.error(error);
        }
    },
};
