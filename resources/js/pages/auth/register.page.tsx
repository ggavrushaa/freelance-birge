import { AuthInfoCard, AuthLayout, SeedPhrase } from '@/features/auth';
import { useActive } from '@/shared/hooks/use-active';
import { Button } from '@/shared/ui/button';
import { CopyButton } from '@/shared/ui/copy-button';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

const phrase = [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
    'honey',
    'kiwi',
    'lemon',
    'mango',
    'nectarine',
];

const RegisterPage = () => {
    const continueButton = useActive();

    const handleClickCopy = () => {
        navigator.clipboard.writeText(phrase.join(' '));
        continueButton.activate();
    };

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/lock.webp"
                title="Создать аккаунт"
                text="Сохраните эту секретную фразу из 12 слов в правильном порядке. Она даёт полный доступ к счёту — никому её не передавайте"
                className="mb-6"
            />
            <SeedPhrase
                seedPhrase={phrase}
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
                onClick={() => router.visit('confirm-register')}
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
