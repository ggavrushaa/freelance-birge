import { router } from '@inertiajs/react';

export const dashboardService = {
    getCustomerDashboard: (searchQuery?: string) => {
        router.get(`/customer/dashboard`, searchQuery ? { search: searchQuery } : {}, {
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    },
    getFreelanceDashboard: (searchQuery?: string) => {
        router.get(`/freelance/dashboard`, searchQuery ? { search: searchQuery } : {}, {
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    },
};
