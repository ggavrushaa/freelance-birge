import { Job, PaginatedJobs } from "@/entities/job";
import { SearchFilters } from "./search-filters";
import { Gig } from "@/entities/gig";

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
    jobs: PaginatedJobs;
}

export interface SearchApi {
    getJobs: (params:GetJobsParams) => Promise<GetJobsResponce | null>;
    getGigs : (params:GetJobsParams) => Promise<GetGigsResponce | null>;
    getSuggestions: (searchText: string) => Promise<(Job | Gig)[]>;

}