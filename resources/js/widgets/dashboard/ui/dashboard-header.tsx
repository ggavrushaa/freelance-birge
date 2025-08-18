import { NotificationBadge } from '@/entities/notification';
import { SearchSuggestionsList, useSearchSuggestions } from '@/features/search';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { Logo } from '@/shared/ui/logo';
import { router } from '@inertiajs/react';
import cls from 'classnames';
import { ChangeEvent, useMemo } from 'react';

interface DashboardHeaderProps {
    query: string;
    onChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
    searhInput: {
        isFocused: boolean;
        focus: () => void;
        blur: () => void;
    };
}

export const DashboardHeader = (props: DashboardHeaderProps) => {
    const { query, onChangeQuery, searhInput } = props;
    const {
        auth: { notifications },
    } = usePageProps();
    const { data: suggestions = [] } = useSearchSuggestions(query);

    const handleClickNotificationBadge = () => {
        router.get(ROUTES.notifications);
    };

    const newNotifications = useMemo(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        () => notifications.filter((n: any) => n.read_at === null),
        [notifications],
    );

    const handleClickSuggestion = (text: string) => {
        router.get('/search/suggestions', {
            query: text,
        });
    };

    return (
        <>
            <Logo className="mx-auto mb-7 h-12.5 w-28" />
            <div className="relative mx-6 mb-4 grid grid-cols-[1fr_28px] items-center gap-3">
                <InputWithIcon
                    value={query}
                    onChange={onChangeQuery}
                    placeholder="Поиск"
                    renderIcon={() => <img src="/icons/search.svg" alt="search" className="mr-3" />}
                    onFocus={searhInput.focus}
                    onBlur={searhInput.blur}
                    className={cls(
                        'flex-1 gap-0 rounded-xl py-2 pl-[34%] transition-all duration-300',
                        {
                            'pl-[4%]': searhInput.isFocused,
                        },
                    )}
                />
                <NotificationBadge
                    onClick={handleClickNotificationBadge}
                    notificationsCount={newNotifications.length}
                    className="shrink-0"
                />
                {searhInput.isFocused && (
                    <SearchSuggestionsList
                        onClickSuggestion={handleClickSuggestion}
                        suggestions={suggestions}
                        className="absolute top-[130%] left-0 w-full px-6"
                    />
                )}
            </div>
        </>
    );
};
