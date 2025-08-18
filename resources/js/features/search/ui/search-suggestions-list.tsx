import { Gig } from '@/entities/gig';
import { Job } from '@/entities/job';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface SearchSuggestionsListProps extends ComponentProps<'div'> {
    onClickSuggestion: (text: string) => void;
    suggestions: (Job | Gig)[];
}

export const SearchSuggestionsList = (props: SearchSuggestionsListProps) => {
    const { suggestions = [], onClickSuggestion, ...rest } = props;

    if (suggestions.length === 0) return null;


    return (
        <Card {...rest} className={classNames("gap-0 px-4 py-3",props.className)}>
            <Title className="mb-3">Предложения</Title>
            <div className="[&>div:first-of-type]:pt-0 [&>div:last-of-type]:border-b-0 [&>div:last-of-type]:pb-0">
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.id}
                        onClick={() => {
                            onClickSuggestion(suggestion.name);
                        }}
                        onMouseDown={() => onClickSuggestion(suggestion.name)}
                        className="border-profile flex items-center border-b py-2.5"
                    >
                        <img src="/icons/clock.svg" className="mr-2" />
                        <Text>{suggestion.name}</Text>
                        <img src="/icons/arrow-left.svg" className="ml-auto" />
                    </div>
                ))}
            </div>
        </Card>
    );
};
