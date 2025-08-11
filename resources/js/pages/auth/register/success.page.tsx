import { UserCard, UserCardContent, UserCardHeader } from '@/entities/user';
import { AuthInfoCard, AuthLayout } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

const RegisterSuccessPage = () => {
    const {
        auth: { user },
    } = usePageProps();
    return (
        <>
            <AuthInfoCard
                imageUrl="/images/success.webp"
                title="Поздравляем!"
                text="Регистрация прошла успешно"
                className="mb-6"
            />
            <UserCard
                header={
                    <UserCardHeader
                        userName={user.username}
                        badges={null}
                        rightAddon={
                            <img
                                src="/icons/arrow-right.svg"
                                className="btn-press ml-auto"
                            />
                        }
                    />
                }
                content={
                    <UserCardContent
                        rating={user.rating}
                        ordersCount={user.orders_count}
                        completedOrdersCount={user.completed_orders_count}
                    />
                }
                className="w-full bg-[#eeeeef]"
            />
            <Link href={ROUTES.auth.createPassword} className="mt-auto w-full">
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
