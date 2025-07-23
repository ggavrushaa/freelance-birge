import { ReactNode } from 'react';

interface TariffAdditionalsModalProps {
    children: ReactNode;
}

export const TariffAdditionalsModal = (props: TariffAdditionalsModalProps) => {
    const { children } = props;
    return (
        <div className="bg-main fixed top-0 left-0 flex min-h-[100svh] w-full flex-col px-6 pt-22 pb-12">
            {children}
        </div>
    );
};
