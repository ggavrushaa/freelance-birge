import { Navbar } from '@/widgets/navbar';
import { usePage } from '@inertiajs/react';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-is-mobile';

export const LayoutWithNavbar = ({ children }: { children: ReactNode }) => {
    const { url } = usePage();
    const [isFocused, setIsFocused] = useState(false);
    const isMobile = useIsMobile();
    useEffect(() => {
        if (!isMobile) return;

        const inputElements = document.querySelectorAll('input, textarea');

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        inputElements.forEach((input) => {
            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', handleBlur);
        });

        return () => {
            inputElements.forEach((input) => {
                input.removeEventListener('focus', handleFocus);
                input.removeEventListener('blur', handleBlur);
            });
        };
    }, [url, isMobile]);
    return (
        <main className="flex flex-col">
            <div
                className={classNames('flex min-h-[calc(100svh-83px)] flex-col', {
                    'min-h-[100vh]!': isFocused,
                })}
            >
                {children}
            </div>
            {!isFocused && <div className="h-[83px]" />}
            <footer
                className={classNames('fixed bottom-0 left-0 z-10 w-full', {
                    hidden: isFocused,
                })}
            >
                <Navbar />
            </footer>
        </main>
    );
};
