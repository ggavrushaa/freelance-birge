export const SEED_PHRASE_LENGTH = 12;
export const SEED_PHRASE_CONFIRM_LENGTH = 3;
export const PASSWORD_LENGTH = 4;

export const daySelections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

export const statusIcons:Record<string,string> = {
    "Заказ создан": "/icons/order/1.svg",
};
