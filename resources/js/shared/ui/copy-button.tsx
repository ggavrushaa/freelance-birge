import clsx from 'clsx';
import { useState } from 'react';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    copyText?: string;
    className?: string;
    onCopy?: (success: boolean) => void;
}

export const CopyButton = (props: CopyButtonProps) => {
    const { text, copyText, onCopy, ...rest } = props;
    const [isCopied, setIsCopied] = useState(false);

    const textToCopy = copyText || text;

    const copyToClipboard = async (textToCopy: string) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
                setIsCopied(true);
                onCopy?.(true);
                setTimeout(() => setIsCopied(false), 2000);
                return true;
            }

            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                setIsCopied(true);
                onCopy?.(true);
                setTimeout(() => setIsCopied(false), 2000);
                return true;
            }

            onCopy?.(false);
            return false;
        } catch (error) {
            console.error('Failed to copy text:', error);
            onCopy?.(false);
            return false;
        }
    };

    const handleClick = async () => {
        await copyToClipboard(textToCopy);
    };

    return (
        <button
            {...rest}
            onClick={handleClick}
            className={clsx('flex items-center justify-center gap-2', props.className)}
        >
            <img src="/icons/copy.svg" alt="copy" />
            <p className="text-accent">{isCopied ? 'Скопировано!' : text}</p>
        </button>
    );
};
