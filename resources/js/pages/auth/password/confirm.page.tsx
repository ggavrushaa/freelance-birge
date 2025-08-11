import { AuthInfoCard, AuthLayout, PasswordKeyPad, usePasswordDigits } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { PASSWORD_LENGTH } from '@/shared/consts';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface ConfirmPasswordPageProps {
    errors: Partial<{
        pin_code: string;
    }>;
}

const ConfirmPasswordPage = (props: ConfirmPasswordPageProps) => {
    const { errors } = props;
    const password = usePasswordDigits();

    const onComplete = () => {
        router.post(ROUTES.auth.confirmPassword, { pin_code: password.normalDigits });
    };

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/laptopboy.webp"
                title="Ваш PIN-код"
                text="Подтвердите PIN-код"
                className="mb-6"
            />
            <div className="relative mb-18">
                <InputOTP
                    value={password.hiddenDigits}
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
                {errors.pin_code && (
                    <p className="absolute bottom-[-60px] left-[50%] w-full -translate-x-1/2 text-center text-red-500">
                        {errors.pin_code}
                    </p>
                )}
            </div>
            <PasswordKeyPad
                onDigitClick={password.addDigit}
                onClearClick={password.remoweLastDigit}
            />
        </>
    );
};

ConfirmPasswordPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Create password" />
        {page}
    </AuthLayout>
);

export default ConfirmPasswordPage;
