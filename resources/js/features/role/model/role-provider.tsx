import { useFetch } from '@/shared/hooks/use-fetch';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { usePage } from '@inertiajs/react';
import { init, viewport } from '@telegram-apps/sdk';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Role } from './types';
import WebApp from "@twa-dev/sdk";

type RoleContext = {
    role: Role;
    switchRole: () => void;
};

const roleContext = createContext<RoleContext | null>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
    const { url } = usePage();
    const { data, refetch } = useFetch<{ role: Role }>('/user/role');
    const { auth, csrf_token } = usePageProps();

    const backButton = WebApp.BackButton;

    const onBackButtonClick = useCallback(() => {
        window.history.back();
    }, []);

    const [localRole, setLocalRole] = useState<Role | null>(null);

    const role = localRole ?? data?.role ?? 'customer';

    useEffect(() => {
        const initApp = async () => {
            init();
            viewport.mount();
            WebApp.ready();
            WebApp.isVerticalSwipesEnabled = false;
            await viewport.requestFullscreen();
            if (url === '/' && backButton.isVisible) {
                backButton.hide();
            } else if (url !== '/' && !backButton.isVisible) {
                backButton.show();
            }

            backButton.onClick(onBackButtonClick);
            return () => {
                backButton.offClick(onBackButtonClick);
            };
        };
        initApp();
    }, [backButton,onBackButtonClick,url]);

    const switchRole = async () => {
        const newRole = role === 'freelancer' ? 'customer' : 'freelancer';
        setLocalRole(newRole);
        try {
            await fetch(`/user/${auth.user.id}/switch-role`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                method: 'POST',
                body: JSON.stringify({
                    role_slug: newRole,
                }),
            });
            refetch();
        } catch (error) {
            console.error('Error switching role:', error);
        }
    };

    return <roleContext.Provider value={{ role, switchRole }}>{children}</roleContext.Provider>;
};

export const useRoleContext = () => {
    const context = useContext(roleContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
