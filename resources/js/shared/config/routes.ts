export const ROUTES = {
    auth: {
        login: 'login',
        loginVerification: 'login-verification',
        register: 'register',
        registerConfirm: 'register-confirm',
        registerSuccess: 'register-success',
        createPassword: 'create-password',
        confirmPassword: 'confirm-password',
    },
    customer: {
        job: {
            create: 'customer-job',
            edit: (id: number) => `/customer-job/${id}/edit`,
            update: (id: number) => `/customer-job/${id}/update`,
            publish: (id: number) => `/customer-job/${id}/published`,
        },
    },
    freelance: {
        gig: {
            create: '/freelance-gig',
            edit: (id: number) => `/freelance-gig/${id}/edit`,
            // update: (id:number) => `/freelance-gig/${id}/update`,
            // publish: (id:number) => `/freelance-gig/${id}/published`,
        },
    },
    profile: {
        create: '/profile/create',
        edit: (id: number) => `/profile/${id}/edit`,
    },
    portfolio: {
        create: '/portfolio/create',
        edit: (id: number) => `/portfolio/${id}/edit`,
        update: (id: number) => `/portfolio/${id}`,
    },
    tariff: {
        create: '/tariff/create',
        edit: (id: number) => `/tariff/${id}/edit`,
        update: (id: number) => `/tariff/${id}`,
        delete: (id: number) => `/tariff/${id}`,
    },
};
