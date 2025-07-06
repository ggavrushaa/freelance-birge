import { AuthInfoCard, AuthLayout, SeedPhrase, useSeedPhrase } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { SEED_PHRASE_LENGTH } from '@/shared/consts';
import { Button } from '@/shared/ui/button';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

const LoginVerificationPage = () => {
    const { phrase, onChangePhrase, isPhraseFilled } = useSeedPhrase({
        length: SEED_PHRASE_LENGTH,
    });
    const handleClickContinue = () => {
        router.post(ROUTES.auth.loginVerification, { words: phrase });
    };
    return (
        <>
            <AuthInfoCard
                imageUrl="/images/laptopboy.webp"
                title="Восстановление!"
                text="Пожалуйста, введите вашу seed-фразу для восстановления аккаунта"
                className="mb-6"
            />
            <SeedPhrase
                seedPhrase={phrase}
                renderInput={(word, index) => (
                    <SeedPhrase.Input
                        key={index}
                        index={index}
                        value={word}
                        onChange={onChangePhrase}
                    />
                )}
                className="mb-18"
            />
            <Button onClick={handleClickContinue} disabled={!isPhraseFilled} className="w-full">
                Продолжить
            </Button>
        </>
    );
};

LoginVerificationPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Login" />
        {page}
    </AuthLayout>
);

export default LoginVerificationPage;
