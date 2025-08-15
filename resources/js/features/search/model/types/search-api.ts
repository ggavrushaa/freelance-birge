import { Gig, PaginatedGigs } from '@/entities/gig';
import { Job, PaginatedJobs } from '@/entities/job';
import { SearchFilters } from './search-filters';

interface GetJobsParams {
    search: string;
    [key: string]: string | boolean;
}

interface GetJobsResponce {
    filters: SearchFilters;
    jobs: PaginatedJobs;
}

interface GetGigsResponce {
    filters: SearchFilters;
    gigs: PaginatedGigs;
}

export interface SearchApi {
    getJobs: (params: GetJobsParams) => Promise<GetJobsResponce | null>;
    getGigs: (params: GetJobsParams) => Promise<GetGigsResponce | null>;
    getSuggestions: (searchText: string) => Promise<(Job | Gig)[]>;
    getJobsSuggestions: (searchText: string) => Promise<{
        suggestions: [];
    }>;
    getGigsSuggestions: (searchText: string) => Promise<{
        suggestions: [];
    }>;
}
