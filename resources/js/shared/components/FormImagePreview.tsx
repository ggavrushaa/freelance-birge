import classNames from 'classnames';

interface FormImagePreviewProps {
    preview: string | null;
    placeholder?: string;
    className?: string;
}

export const FormImagePreview = (props: FormImagePreviewProps) => {
    const { preview, placeholder } = props;
    return (
        <div
            className={classNames(
                'flex h-48 w-full items-center justify-center overflow-hidden rounded-sm bg-[#fff]',
                props.className,
            )}
            style={{
                backgroundImage: preview ? `url(${preview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {preview ? null : (
                <p className="font-semibold">{placeholder ? placeholder : 'Ваше фото'}</p>
            )}
        </div>
    );
};
