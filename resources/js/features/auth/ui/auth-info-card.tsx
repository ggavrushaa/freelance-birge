import clsx from 'clsx';

interface AuthInfoCardProps {
    imageUrl: string;
    title: string;
    text: string;
    className?: string;
}

export const AuthInfoCard = (props: AuthInfoCardProps) => {
    const { imageUrl, title, text, className = '' } = props;
    return (
        <div className={clsx('flex max-w-[274px] flex-col items-center text-center', className)}>
            <img className="mb-2 max-w-150" src={imageUrl} />
            <h2 className="mb-3 text-[34px] font-semibold tracking-tighter">{title}</h2>
            <p className="f-[17px] tracking-tighter text-[#3c3c4399]">{text}</p>
        </div>
    );
};
