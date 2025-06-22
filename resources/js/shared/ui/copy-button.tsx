import clsx from 'clsx';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
}

export const CopyButton = (props: CopyButtonProps) => {
    const { text, ...rest } = props;
    return (
        <button {...rest} className={clsx('flex items-center justify-center gap-2', props.className)}>
            <img src="/icons/copy.svg" alt="copy" />
            <p className="text-accent">{text}</p>
        </button>
    );
};
