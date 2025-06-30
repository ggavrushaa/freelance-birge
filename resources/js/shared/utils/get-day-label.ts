export const getDayLabel = (n: number) => {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${n} дней`;
    }
    if (lastDigit === 1) {
        return `${n} день`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${n} дня`;
    }
    return `${n} дней`;
};
