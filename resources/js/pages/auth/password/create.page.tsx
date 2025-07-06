import { AuthInfoCard, AuthLayout, PasswordKeyPad } from '@/features/auth';
import { getHiddenPassword } from '@/features/auth/utils/get-hidden-password';
import { PASSWORD_LENGTH } from '@/shared/consts';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Head, router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

const CreatePasswordPage = () => {
    const [password, setPassword] = useState('');

    const handleDigitClick = (digit: number) => {
        if (password.length < PASSWORD_LENGTH) {
            const newPassword = password + digit;
            setPassword(newPassword);
        }
    };

    const handleClearClick = () => {
        const newPassword = password.slice(0, -1);
        setPassword(newPassword);
    };

    const onComplete = () => {
        router.post('create-password', { pin_code: password });
    };

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/laptopboy.webp"
                title="Ваш PIN-код"
                text="Придумайте PIN-код"
                className="mb-6"
            />
            <div className="mb-18">
                <InputOTP
                    value={getHiddenPassword(password)}
                    maxLength={PASSWORD_LENGTH}
                    onComplete={onComplete}
                    disabled
                    className="gap-2"
                >
                    <InputOTPGroup className="space-x-2">
                        {Array.from({ length: PASSWORD_LENGTH }).map((_, index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className="password-star h-[60px] w-[50px] rounded-md border-l border-[#242424] bg-secondary"
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <PasswordKeyPad onDigitClick={handleDigitClick} onClearClick={handleClearClick} />
        </>
    );
};

CreatePasswordPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Create password" />
        {page}
    </AuthLayout>
);

export default CreatePasswordPage;
