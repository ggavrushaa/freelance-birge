import { AuthInfoCard, AuthLayout, SeedPhrase, useSeedPhrase } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { SEED_PHRASE_CONFIRM_LENGTH } from '@/shared/consts';
import { Button } from '@/shared/ui/button';
import { Head, router } from '@inertiajs/react';
import { ReactNode, useRef, useState } from 'react';

interface RegisterConfirmPageProps {
    wordIndices: number[];
    errors: {
        error: string;
    };
}

const RegisterConfirmPage = (props: RegisterConfirmPageProps) => {
    const { wordIndices, errors } = props;
    const [localError, setLocalError] = useState<null | string>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { phrase, onChangePhrase, isPhraseFilled } = useSeedPhrase({
        length: SEED_PHRASE_CONFIRM_LENGTH,
    });

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
                handleClickContinue();
            }
        }
    };

    const handleClickContinue = () => {
        if (isValidForm()) {
            router.post(
                ROUTES.auth.registerConfirm,
                { 
                    words: phrase,
                    indices: wordIndices
                },
                {
                    preserveState: true,
                },
            );
        }
    };

    const error = localError ? localError : (errors.error ?? errors.error);

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/man.webp"
                title="Проверка!"
                text={`Для подтверждения seed-фразы введите слова № ${wordIndices[0]}, ${wordIndices[1]} и ${wordIndices[2]}`}
                className="mb-6 [&>p]:max-w-[234px]"
            />
            <SeedPhrase
                seedPhrase={phrase}
                renderInput={(word, index) => (
                    <SeedPhrase.Input
                        index={index}
                        orderNumber={wordIndices[index]}
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        value={word}
                        onChange={(e) => onChangePhrase(index,e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e,index)}
                        className={error ? 'border border-red' : ''}
                    />
                )}
                className="mb-12"
                error={error}
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
