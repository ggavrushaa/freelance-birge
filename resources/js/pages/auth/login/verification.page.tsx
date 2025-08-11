import { AuthInfoCard, AuthLayout, SeedPhrase, useSeedPhrase } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { SEED_PHRASE_LENGTH } from '@/shared/consts';
import { useWebApp } from '@/shared/hooks/use-web-app';
import { Button } from '@/shared/ui/button';
import { SharedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ReactNode, useRef, useState } from 'react';

type LoginVerificationPageProps = SharedData & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: Record<string, any>;
};

const LoginVerificationPage = (props: LoginVerificationPageProps) => {
    const { errors } = props;
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [localError, setLocalError] = useState<null | string>(null);
    const { user } = useWebApp();
    const { phrase, onChangePhrase, setPhraseFromClipboard, isPhraseFilled } = useSeedPhrase({
        length: SEED_PHRASE_LENGTH,
    });
    const telegramId = user.telegram_id;

    const isValidForm = () => {
        if (!isPhraseFilled()) {
            setLocalError('Вы не заполнили сид фразу');
            return false;
        }
        setLocalError(null);
        return true;
    };

    const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextInput = inputRefs.current[idx + 1];
            if (nextInput) {
                nextInput.focus();
            } else {
                const currentInput = inputRefs.current[idx];
                currentInput?.blur();
            }
        }
    };

    const handleClickContinue = () => {
        if (isValidForm()) {
            const indices = Array.from({ length: 12 }, (_, i) => i + 1);
            router.post(ROUTES.auth.loginVerification, {
                words: phrase,
                indices: indices,
                telegram_id: telegramId,
            },{
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const error = localError ? localError : (errors.error ?? errors.error);

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
                        onChange={(e) => onChangePhrase(index,e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e,index)}
                        onPaste={setPhraseFromClipboard}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        className={error ? 'border border-red' : ''}
                    />
                )}
                error={error}
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
