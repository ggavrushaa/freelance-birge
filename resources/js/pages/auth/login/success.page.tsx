import { AuthInfoCard, AuthLayout } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

const LoginSuccessPage = () => {
    return (
        <>
            <AuthInfoCard
                imageUrl="/images/success.webp"
                title="С возвращением!"
                text="Вы успешно ввели seed-фразу"
                className="mb-6"
            />
            <Link href={ROUTES.auth.confirmPassword} className="mt-auto w-full">
                <Button className="w-full">Продолжить</Button>
            </Link>
        </>
    );
};

LoginSuccessPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Register success" />
        {page}
    </AuthLayout>
);

export default LoginSuccessPage;
