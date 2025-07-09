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
            edit: (id:number) => `/customer-job/${id}/edit`,
            update: (id:number) => `/customer-job/${id}/update`,
            publish: (id:number) => `/customer-job/${id}/published`,
        },
    }
};