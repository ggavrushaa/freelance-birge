import { AuthInfoCard, AuthLayout, SeedPhrase, useSeedPhrase } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { SEED_PHRASE_CONFIRM_LENGTH } from '@/shared/consts';
import { Button } from '@/shared/ui/button';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface RegisterConfirmPageProps {
    index: string[];
    errors: {
        error: string;
    };
}

const RegisterConfirmPage = (props: RegisterConfirmPageProps) => {
    const { index, errors } = props;

    const { phrase, onChangePhrase, isPhraseFilled } = useSeedPhrase({
        length: SEED_PHRASE_CONFIRM_LENGTH,
    });

    const handleClickContinue = () => {
        router.post(
            ROUTES.auth.registerConfirm,
            { words: phrase },
            {
                preserveState: true,
            },
        );
    };

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/man.webp"
                title="Восстановление!"
                text={`Для подтверждения seed-фразы введите слова № ${index[0]}, ${index[1]} и ${index[2]}`}
                className="mb-6 [&>p]:max-w-[234px]"
            />
            <SeedPhrase
                seedPhrase={phrase}
                renderInput={(word, index) => (
                    <SeedPhrase.Input
                        key={index}
                        index={index}
                        value={word}
                        onChange={onChangePhrase}
                        className={errors.error ? 'border border-red' : ''}
                    />
                )}
                className="mb-12"
                error={errors.error}
            />
            <Button
                onClick={handleClickContinue}
                disabled={!isPhraseFilled()}
                className="mt-auto w-full"
            >
                Продолжить
            </Button>
        </>
    );
};

RegisterConfirmPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Confirm registration" />
        {page}
    </AuthLayout>
);

export default RegisterConfirmPage;
