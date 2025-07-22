import { useRef, useState } from 'react';

export const useFile = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement>(null);

    const onClick = () => {
        ref.current?.click();
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onFileLoaded?: (file: File) => void,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                if (onFileLoaded) {
                    onFileLoaded(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        ref,
        preview,
        onClick,
        onChange,
    };
};
