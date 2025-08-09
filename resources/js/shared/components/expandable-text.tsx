import classNames from 'classnames';
import { useVisibility } from '../hooks/use-visibility';
import { truncateText } from '../utils/truncate-text';

const MAX_DESCRIPTION_LENGTH = 140;

interface ExpandableTextProps extends React.ComponentProps<'p'> {
    text: string;
}

export const ExpandableText = (props: ExpandableTextProps) => {
    const { text, ...rest } = props;
    const description = useVisibility();
    return (
        <p className={classNames('mb-2.5', props.className)} onClick={description.toggle} {...rest}>
            {description.isVisible ? text : truncateText(text, MAX_DESCRIPTION_LENGTH)}
            &nbsp;
            {MAX_DESCRIPTION_LENGTH < text.length && (
                <span className="text-15 text-500 text-accent">
                    {description.isVisible ? 'Скрыть' : 'Еще'}
                </span>
            )}
        </p>
    );
};
