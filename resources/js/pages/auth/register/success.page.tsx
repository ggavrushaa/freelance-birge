import { AuthInfoCard, AuthLayout } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

const RegisterSuccessPage = () => {
    return (
        <>
            <AuthInfoCard
                imageUrl="/images/success.webp"
                title="Поздравляем!"
                text="Регистрация прошла успешно"
                className="mb-6"
            />
            <Link href={ROUTES.auth.createPassword} className='w-full mt-auto'>
                <Button className="w-full">Продолжить</Button>
            </Link>
        </>
    );
};

RegisterSuccessPage.layout = (page: ReactNode) => (
    <AuthLayout>
        <Head title="Register success" />
        {page}
    </AuthLayout>
);

export default RegisterSuccessPage;
