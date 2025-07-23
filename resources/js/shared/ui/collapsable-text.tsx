import classNames from 'classnames';
import { useVisibility } from '../hooks/use-visibility';
import { truncateText } from '../utils/truncate-text';

const MAX_TEXT_LENGTH = 140;

interface CollapsableTextProps {
    text: string;
    maxLength?: number;
    className?: string;
}

export const CollapsableText = (props: CollapsableTextProps) => {
    const { text, maxLength = MAX_TEXT_LENGTH } = props;
    const textVisibility = useVisibility();
    return (
        <p className={classNames('mb-2.5', props.className)} onClick={textVisibility.toggle}>
            {textVisibility.isVisible ? text : truncateText(text, maxLength)}
            &nbsp;
            {maxLength < text.length && (
                <span className="text-500 text-[13px]! text-accent">
                    {textVisibility.isVisible ? 'Скрыть' : 'Еще'}
                </span>
            )}
        </p>
    );
};
