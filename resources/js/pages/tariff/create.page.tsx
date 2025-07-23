import { CreateTariffForm } from '@/features/tariff/create-tariff';
import { createTariffSchema } from '@/features/tariff/create-tariff/model/validation/create-tariff-schema';
import { router } from '@inertiajs/react';
import z from 'zod';

const TariffCreatepage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tariffIndex = searchParams.get('tariffIndex');
    const gigId = searchParams.get('gigId');
    const tariffValues = {
        name: '',
        description: '',
        price: 0,
        term: 0,
        corrections: 0,
        additional_options: null,
    };

    const onSubmit = (data: z.infer<typeof createTariffSchema>) => {
        router.post('/tariff', {
            ...data,
            additional_options:
                data.additional_options &&
                data.additional_options.map((additional_option) => additional_option.value),
            freelance_gig_id: gigId,
        });
    };

    return (
        <main className="min-h-[100svh] bg-[#efeff4] px-6 pt-22 pb-12">
            <CreateTariffForm
                tariffValues={tariffValues}
                tariffIndex={Number(tariffIndex)}
                onSave={onSubmit}
            />
        </main>
    );
};

export default TariffCreatepage;
