import { Navbar } from '@/widgets/navbar';
import { ReactNode } from 'react';

export const LayoutWithNavbar = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex min-h-[100svh] flex-col">
            {children}
            <footer>
                <Navbar />
            </footer>
        </main>
    );
};
