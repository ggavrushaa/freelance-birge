import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Welcome"></Head>
            <div className="relative flex h-[100vh] flex-col justify-end p-6">
                <img className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" src="/images/logo.svg" alt="logo" />
                <div className="flex flex-col gap-3">
                    <Link href={route('login')}>
                        <Button className="w-full" variant="ghost">
                            Войти
                        </Button>
                    </Link>
                    <Link href={route('login')}>
                        <Button className="w-full" size="default">
                            Зарегистрироваться
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
