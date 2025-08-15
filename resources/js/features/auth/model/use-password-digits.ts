import { PASSWORD_LENGTH } from "@/shared/consts";
import { useState } from "react";

export const usePasswordDigits = () => {
    const [digits, setDigits] = useState<{ value: string; visible: boolean }[]>([]);

    const addDigit = (digit: number) => {
        if (digits.length < PASSWORD_LENGTH) {
            const newDigits = [...digits, { value: String(digit), visible: true }];
            setDigits(newDigits);
            setTimeout(() => {
                setDigits((prev) =>
                    prev.map((d, i) => (i === newDigits.length - 1 ? { ...d, visible: false } : d)),
                );
            }, 700);
        }
    };

    const remoweLastDigit = () => {
        setDigits((prev) => prev.slice(0, -1));
    };
    const hiddenDigits = digits.map((d) => (d.visible ? d.value : '*')).join('');
    const normalDigits = digits.map((digit) => digit.value).join('');
    return {
        digits,
        addDigit,
        remoweLastDigit,
        hiddenDigits,
        normalDigits,
    };
};