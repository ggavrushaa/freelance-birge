import { Portal } from '@/shared/ui/portal';
import { ReactNode } from 'react';

interface CreateTariffFormLayoutProps {
    children: ReactNode;
}

export const CreateTariffFormLayout = (props: CreateTariffFormLayoutProps) => {
    const { children } = props;
    return (
        <Portal>
            <div className="bg-main fixed top-0 left-0 flex max-h-[100svh] min-h-[100svh] w-full flex-col overflow-y-auto px-6 pt-22 pb-12">
                {children}
            </div>
        </Portal>
    );
};
