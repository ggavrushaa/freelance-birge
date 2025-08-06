import { Navbar } from '@/widgets/navbar';
import classNames from 'classnames';
import { ReactNode} from 'react';

export const LayoutWithNavbar = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex flex-col">
            <div
                className={classNames('flex min-h-[calc(100svh-83px)] flex-col')}
            >
                {children}
            </div>
            <div className="h-[83px]" />
            <footer className="fixed bottom-0 left-0 w-full">
                <Navbar />
            </footer>
        </main>
    );
};
