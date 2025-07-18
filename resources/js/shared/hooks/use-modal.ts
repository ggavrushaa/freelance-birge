import { useCallback, useState } from 'react';

interface useModalProps {
    initialState?: boolean;
}

export const useModal = ({ initialState = false }: useModalProps = {}) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        open,
        close,
    };
};
