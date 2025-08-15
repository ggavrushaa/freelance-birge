export interface SearchFilters {
    [key: string]: {
        [key: string]: string;
    };
    // completion_time: {
    //     all: 'Все';
    //     '1-2': '1-2 дня';
    //     '3-5': '3-5 дней';
    //     '7+': '7+ дней';
    // };
    // express_mode: {
    //     all: 'Все';
    //     true: 'Экспресс-проекты';
    // };
    // premium_mode: {
    //     all: 'Все';
    //     true: 'Premium';
    // };
    // seller_level: {
    //     all: 'Все';
    //     novice: 'Новичок';
    //     experienced: 'Опытный';
    //     professional: 'Профи';
    // };
    // review_range: {
    //     all: 'Все';
    //     '0-5': '0-5 отзывов';
    //     '10-50': '10-50 отзывов';
    //     '50-100': '50-100 отзывов';
    // };
    // similar: {
    //     all: 'Все';
    //     true: 'Похожие';
    // };
}
