import clsx from 'clsx';

interface LogoProps {
    className?: string;
}

export const Logo = (props: LogoProps) => {
    return <img src="/images/logo.svg" alt="logo" className={clsx('', props.className)} />;
};
