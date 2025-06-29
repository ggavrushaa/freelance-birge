import { PASSWORD_LENGTH } from "@/shared/consts";

export const getHiddenPassword = (password: string) => {
    if (password.length === 0) return ''.padEnd(PASSWORD_LENGTH, '');
    const masked = '*'.repeat(password.length - 1);
    const lastChar = password.slice(-1);
    return (masked + lastChar).padEnd(PASSWORD_LENGTH, '');
};