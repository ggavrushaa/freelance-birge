export type NotificationType =
    | 'welcome'
    | 'job_created'
    | 'job_updated'
    | 'gig_created'
    | 'gig_updated'
    | 'application_received'
    | 'application_accepted'
    | 'application_rejected'
    | 'payment_received'
    | 'payment_sent'
    | 'system'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

export interface Notification {
    id: number;
    user_id: number;
    title: string;
    description: string;
    type: NotificationType;
    read_at: string | null;
    expires_at: string;
    created_at: string;
    updated_at: string;
}
