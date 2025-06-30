import { AuthInfoCard, AuthLayout, SeedPhrase } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { useActive } from '@/shared/hooks/use-active';
import { Button } from '@/shared/ui/button';
import { CopyButton } from '@/shared/ui/copy-button';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface RegisterPageProps {
    seed: string[];
}

const RegisterPage = (props: RegisterPageProps) => {
    const { seed } = props;
    const continueButton = useActive();

    const handleClickCopy = () => {
        navigator.clipboard.writeText(seed.join(' '));
        continueButton.activate();
    };

    const handleClickContinue = () => {
        router.visit(ROUTES.auth.registerConfirm)
    }

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/lock.webp"
                title="Создать аккаунт"
                text="Сохраните эту секретную фразу из 12 слов в правильном порядке. Она даёт полный доступ к счёту — никому её не передавайте"
                className="mb-6"
            />
            <SeedPhrase
                seedPhrase={seed}
                renderInput={(word, index) => (
                    <SeedPhrase.Input
                        key={index}
                        index={index}
                        value={word}
                        disabled
                        className="max-h-[36px] [&>input]:ml-0 [&>input]:text-center [&>span]:text-xs"
                    />
                )}
                className="mb-6 grid grid-cols-2 gap-3 text-center text-muted"
            />
            <CopyButton text="Копировать" onClick={handleClickCopy} />
            <Button
                disabled={!continueButton.isActive}
                onClick={handleClickContinue}
                className="mt-auto w-full"
            >
                Продолжить
            </Button>
        </>
    );
};

RegisterPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Register" />
        {page}
    </AuthLayout>
);

export default RegisterPage;
