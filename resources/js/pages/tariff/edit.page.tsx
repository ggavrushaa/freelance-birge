import { Tariff } from '@/entities/tariff/model/types';
import { EditTariffForm } from '@/features/tariff/edit-tariff';
import { editTariffSchema } from '@/features/tariff/edit-tariff/model/validation/edit-tariff-schema';
import { ROUTES } from '@/shared/config/routes';
import { AdditionalOption } from '@/types';
import { router } from '@inertiajs/react';
import z from 'zod';

interface TariffEditpageProps {
    tariff: Tariff;
    additionalOptions: AdditionalOption[];
}

const TariffEditpage = (props: TariffEditpageProps) => {
    const { tariff, additionalOptions } = props;
    const searchParams = new URLSearchParams(window.location.search);
    const tariffIndex = searchParams.get('tariffIndex');
    const getChoosenOptions = () => {
        if (tariff.additional_options && tariff.additional_options.length > 0) {
            const values = tariff.additional_options.map((item) => item);
            return additionalOptions.filter((option) => values.includes(option.value));
        } else {
            return [];
        }
    };
    const defaultformValues = {
        name: tariff.name,
        description: tariff.description,
        price: Number(tariff.price),
        term: tariff.term,
        corrections: tariff.corrections,
        additional_options: getChoosenOptions(),
    };
    const onSubmit = (data: z.infer<typeof editTariffSchema>) => {
        router.patch(ROUTES.tariff.update(tariff.id),{
            ...data,
            additional_options: data.additional_options?.map((option) => option.value) || [],
        });
    };
    return (
        <main className="bg-[#efeff4] px-6 pt-20 pb-12">
            <EditTariffForm
                formValues={defaultformValues}
                onSubmit={onSubmit}
                additionalOptions={additionalOptions}
                tariffIndex={tariffIndex}
            />
        </main>
    );
};

export default TariffEditpage;
