import { AuthInfoCard, AuthLayout, SeedPhrase, useSeedPhrase } from '@/features/auth';
import { SEED_PHRASE_CONFIRM_LENGTH } from '@/shared/consts';
import { Button } from '@/shared/ui/button';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

const ConfirmRegisterPage = () => {
    const { phrase, onChangePhrase, isPhraseFilled } = useSeedPhrase({ length: SEED_PHRASE_CONFIRM_LENGTH });
    return (
        <>
            <AuthInfoCard
                imageUrl="/images/man.webp"
                title="Восстановление!"
                text="Для подтверждения seed-фразы введите слова №1, 2 и 9"
                className="mb-6 [&>p]:max-w-[234px]"
            />
            <SeedPhrase
                seedPhrase={phrase}
                renderInput={(word, index) => <SeedPhrase.Input key={index} index={index} value={word} onChange={onChangePhrase} />}
                className="mb-12"
            />
            <Button disabled={!isPhraseFilled()} className="w-full mt-auto">
                Продолжить
            </Button>
        </>
    );
};

ConfirmRegisterPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Confirm registration" />
        {page}
    </AuthLayout>
);

export default ConfirmRegisterPage;
