import { AuthInfoCard, AuthLayout, PasswordCountdown, PasswordKeyPad, usePasswordDigits } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { PASSWORD_LENGTH } from '@/shared/consts';
import { useWebApp } from '@/shared/hooks/use-web-app';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Text } from '@/shared/ui/text';
import { Head, router } from '@inertiajs/react';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface LoginIndexPageProps {
    errors: Partial<{
        pin_code: string;
        pin_code_blocked_until: string;
    }>;
}

const LoginIndexPage = (props: LoginIndexPageProps) => {
    const { errors } = props;
    const { user } = useWebApp();
    const password = usePasswordDigits();

    const handleClickForgetPassword = () => {
        router.get(ROUTES.auth.loginVerification);
    };

    const handleComplete = () => {
        router.post('login', {
            pin_code: password.normalDigits,
            telegram_id: String(user.telegram_id),
        });
    };

    return (
        <>
            <AuthInfoCard
                imageUrl="/images/monkey.png"
                title="Ваш PIN-код"
                text="Подтвердите PIN-код"
                className="mb-6"
            />
            <div className="relative mb-18">
                <InputOTP
                    value={password.hiddenDigits}
                    maxLength={PASSWORD_LENGTH}
                    onComplete={handleComplete}
                    disabled
                    className="gap-2"
                >
                    <InputOTPGroup className="space-x-2">
                        {Array.from({ length: PASSWORD_LENGTH }).map((_, index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className={classNames(
                                    'password-star bg-secondar h-[60px] w-[50px] rounded-md border-l border-[#242424]',
                                    {
                                        'border-red-500': errors.pin_code,
                                    },
                                )}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
                {errors.pin_code_blocked_until && (
                    <PasswordCountdown
                        targetDate={errors.pin_code_blocked_until}
                        className="absolute bottom-[-30px] left-[50%] w-full -translate-x-1/2 text-center"
                    />
                )}
                {errors.pin_code && !errors.pin_code_blocked_until && (
                    <p className="absolute bottom-[-60px] left-[50%] w-full -translate-x-1/2 text-center text-red-500">
                        {errors.pin_code}
                    </p>
                )}
            </div>
            <PasswordKeyPad onDigitClick={password.addDigit} onClearClick={password.remoweLastDigit} />
            <Text
                onClick={handleClickForgetPassword}
                fontColor="primary"
                className="mt-7 font-semibold"
            >
                Забыли PIN-код?
            </Text>
        </>
    );
};

LoginIndexPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Create password" />
        {page}
    </AuthLayout>
);

export default LoginIndexPage;
