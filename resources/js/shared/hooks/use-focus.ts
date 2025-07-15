import { useState } from "react";

export const useFocus = () => {
    const [isFocused, setIsFocused] = useState(false);

    const focus = () => {
        setIsFocused(true);
    };

    const blur = () => {
        setIsFocused(false);
    };

    return {
        isFocused,
        focus,
        blur,
    }
};