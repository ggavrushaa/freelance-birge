import React, { useCallback } from 'react';

export const useVisibility = () => {
    const [isVisible, setIsVisible] = React.useState(true);

    const show = useCallback(() => setIsVisible(true), []);
    const hide = useCallback(() => setIsVisible(false), []);
    const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

    return {
        isVisible,
        show,
        hide,
        toggle,
    };
};
