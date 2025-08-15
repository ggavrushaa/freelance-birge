import { Gig } from '@/entities/gig';
import { Job } from '@/entities/job';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';

interface SearchSuggestionsListProps {
    onClickSuggestion: (text: string) => void;
    suggestions: (Job | Gig)[];
}

export const SearchSuggestionsList = (props: SearchSuggestionsListProps) => {
    const { suggestions = [], onClickSuggestion } = props;

    if (suggestions.length === 0) return null;

    return (
        <Card className="gap-0 px-4 py-3">
            <Title className="mb-3">Предложения</Title>
            <div className="[&>div:first-of-type]:pt-0 [&>div:last-of-type]:border-b-0 [&>div:last-of-type]:pb-0">
                {suggestions.map((suggestion) => (
                    <div
                        onClick={() => onClickSuggestion(suggestion.name)}
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
