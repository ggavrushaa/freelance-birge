interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;
    return (
        <main className="flex min-h-[100svh] flex-col items-center px-6 pt-20 pb-12">
            {children}
        </main>
    );
};
