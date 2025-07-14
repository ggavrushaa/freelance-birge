import { SharedData } from '@/types';
import { usePage as inertiaUsePage } from '@inertiajs/react';

export const usePageProps = ():SharedData => {
    return inertiaUsePage().props as unknown as SharedData;
}
