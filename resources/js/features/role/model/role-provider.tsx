import { useFetch } from '@/shared/hooks/use-fetch';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { createContext, ReactNode, useContext } from 'react';
import { Role } from './types';

type RoleContext = {
    role: Role;
    switchRole: () => void;
};

const roleContext = createContext<RoleContext | null>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
    const { data, refetch } = useFetch<{ role: Role }>('/user/role');
    const { auth, csrf_token } = usePageProps();

    const role = data?.role || 'customer';

    const switchRole = () => {
        const newRole = role === 'freelancer' ? 'customer' : 'freelancer';
        try {
            fetch(`/user/${auth.user.id}/switch-role`, {
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
