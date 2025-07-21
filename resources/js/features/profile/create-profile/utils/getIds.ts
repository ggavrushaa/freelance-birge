export const getIds = <T extends { id: number }>(array: T[]) => {
    return array.map((item) => item.id);
};
