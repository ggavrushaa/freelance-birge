import { AuthInfoCard, SeedPhraseInput } from '@/features/auth';
import { useSeedPhrase } from '@/features/auth/model/use-seed-phrase';
import { Button } from '@/shared/ui/button';
import { Head } from '@inertiajs/react';

export default function Login() {
    const { phrase, onChangePhrase, isPhraseFilled } = useSeedPhrase();
    const error = 'Неверно введена сид-фраза, попробуйте снова';
    return (
        <>
            <Head title="Login" />
            <main className="flex h-full flex-col items-center justify-center px-6 pt-20 pb-12">
                <AuthInfoCard
                    imageUrl="/images/laptopboy.webp"
                    title="Восстановление!"
                    text="Пожалуйста, введите вашу seed-фразу для восстановления аккаунта"
                    className="mb-6"
                />
                <SeedPhraseInput
                    length={12}
                    error={error}
                    phrase={phrase}
                    onChangePhrase={onChangePhrase}
                    className={error ? 'mb-4' : 'mb-18'}
                />
                <Button disabled={!isPhraseFilled()} className="w-full">
                    Продолжить
                </Button>
            </main>
        </>
    );
}
