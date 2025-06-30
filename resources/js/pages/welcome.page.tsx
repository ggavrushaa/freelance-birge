import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Head, Link, router } from '@inertiajs/react';

const Welcome = () => {
    const handleClickRegister = () => {
        router.post(ROUTES.auth.register, {
            telegram_id: '123',
            username: 'username',
        });
    };

    return (
        <>
            <Head title="Welcome"></Head>
            <div className="relative flex h-[100vh] flex-col justify-end p-6">
                <img
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                    src="/images/logo.svg"
                    alt="logo"
                />
                <div className="flex flex-col gap-3">
                    <Link href={route(ROUTES.auth.login)}>
                        <Button className="w-full" variant="ghost">
                            Войти
                        </Button>
                    </Link>
                    <Button onClick={handleClickRegister} className="w-full" size="default">
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Welcome;
