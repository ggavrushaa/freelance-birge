import { Tariff } from '../model/types';

export const findLowestTarrifPrice = (tariffs: Tariff[]) => {
    let minimal = 0;

    tariffs.forEach((tariff) => {
        if (minimal < tariff.price) {
            minimal = tariff.price;
        }
    });

    return String(minimal);
};
