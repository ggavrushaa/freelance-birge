import { useCallback, useState } from 'react';

export const useActive = () => {
    const [isActive, setIsActive] = useState(false);

    const activate = useCallback(() => setIsActive(true), []);
    const deactivate = useCallback(() => setIsActive(false), []);

    return {
        isActive,
        activate,
        deactivate,
    };
};
