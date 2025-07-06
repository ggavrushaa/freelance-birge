<?php

namespace App\Enums;

enum SubCategoryEnum: string
{
    // Разработка и IT
    case PYTHON = 'python';
    case JAVASCRIPT_TYPESCRIPT = 'javascript-typescript';
    case WEB_PROGRAMMING = 'web-programming';
    case LAYOUT = 'layout';
    case SCRIPTS_BOTS = 'scripts-bots';
    case MOBILE_APPS = 'mobile-apps';
    case GAME_DEVELOPMENT = 'game-development';
    case DATA_PARSING = 'data-parsing';
    case SERVERS_HOSTING = 'servers-hosting';

    // Дизайн и арт
    case LOGO_BRANDING = 'logo-branding';
    case CREATIVES = 'creatives';
    case UI_UX_DESIGN = 'ui-ux-design';
    case BANNERS_CARDS = 'banners-cards';
    case PHOTO_EDITING = 'photo-editing';
    case _3D_MODELING_VISUALIZATION = '3d-modeling-visualization';
    case AI_DESIGN = 'ai-design';

    // Видео и аудио
    case AUDIO_RECORDING_VOICEOVER = 'audio-recording-voiceover';
    case VIDEO_EDITING = 'video-editing';
    case MOTION_DESIGN = 'motion-design';
    case _3D_ANIMATION = '3d-animation';
    case INTRO_ANIMATION = 'intro-animation';

    // SEO и трафик
    case SEO_PROMOTION = 'seo-promotion';
    case SOCIAL_MEDIA_SMM = 'social-media-smm';
    case CONTEXT_ADS = 'context-ads';
    case DATABASES_CLIENTS = 'databases-clients';
    case EMAIL_MARKETING = 'email-marketing';
    case TARGETING = 'targeting';

    // Тексты и переводы
    case TEXT_TRANSLATION = 'text-translation';
    case ARTICLE_POST_WRITING = 'article-post-writing';
    case EDITING_PROOFREADING = 'editing-proofreading';
    case RESUME_VACANCY_WRITING = 'resume-vacancy-writing';
    case SOCIAL_MEDIA_POSTS = 'social-media-posts';
    case UI_UX_COPYWRITING = 'ui-ux-copywriting';

    // Прочие услуги
    case ACCOUNTING_TAXES = 'accounting-taxes';
    case LEGAL_ASSISTANCE = 'legal-assistance';
    case CLIENT_MANAGEMENT_CRM = 'client-management-crm';
    case TABLE_WORK = 'table-work';

    public function label(): string
    {
        return match ($this) {
            self::PYTHON => 'Python',
            self::JAVASCRIPT_TYPESCRIPT => 'Javascript и Typescript',
            self::WEB_PROGRAMMING => 'Веб-программирование',
            self::LAYOUT => 'Верстка',
            self::SCRIPTS_BOTS => 'Скрипты и боты',
            self::MOBILE_APPS => 'Мобильные приложения',
            self::GAME_DEVELOPMENT => 'Разработка игр',
            self::DATA_PARSING => 'Парсинг данных',
            self::SERVERS_HOSTING => 'Сервера и хостинг',

            // Дизайн и арт
            self::LOGO_BRANDING => 'Логотип и брендинг',
            self::CREATIVES => 'Креативы',
            self::UI_UX_DESIGN => 'Дизайн интерфейсов (UI/UX)',
            self::BANNERS_CARDS => 'Баннеры и визитки',
            self::PHOTO_EDITING => 'Обработка фото',
            self::AI_DESIGN => 'AI-дизайн',
            self::_3D_MODELING_VISUALIZATION => '3D моделирование и визуализация',

            // Видео и аудио
            self::AUDIO_RECORDING_VOICEOVER => 'Аудиозапись и озвучка',
            self::VIDEO_EDITING => 'Обработка видео',
            self::MOTION_DESIGN => 'Motion-дизайн',
            self::_3D_ANIMATION => '3D-анимация',
            self::INTRO_ANIMATION => 'Интро и анимация',

            // SEO и трафик
            self::SEO_PROMOTION => 'Поисковое продвижение (SEO)',
            self::SOCIAL_MEDIA_SMM => 'Соцсети и SMM',
            self::CONTEXT_ADS => 'Контекстная реклама',
            self::DATABASES_CLIENTS => 'Базы данных и клиентов',
            self::EMAIL_MARKETING => 'E-mail рассылки',
            self::TARGETING => 'Таргетинг',

            // Тексты и переводы
            self::TEXT_TRANSLATION => 'Перевод текстов',
            self::ARTICLE_POST_WRITING => 'Написание статей и постов',
            self::EDITING_PROOFREADING => 'Редактура и корректура текстов',
            self::UI_UX_COPYWRITING => 'UI/UX-Копирайтинг',
            self::RESUME_VACANCY_WRITING => 'Составление резюме и вакансий',
            self::SOCIAL_MEDIA_POSTS => 'Посты для соцсетей',

            // Прочие услуги
            self::ACCOUNTING_TAXES => 'Бухгалтерия и налоги',
            self::LEGAL_ASSISTANCE => 'Юридическая помощь',
            self::CLIENT_MANAGEMENT_CRM => 'Управление клиентами и CRM',
            self::TABLE_WORK => 'Работа с таблицами',
        };
    }
     public function category(): CategoryEnum
    {
        return match ($this) {
            // Разработка и IT
            self::PYTHON,
            self::JAVASCRIPT_TYPESCRIPT,
            self::WEB_PROGRAMMING,
            self::LAYOUT,
            self::SCRIPTS_BOTS,
            self::MOBILE_APPS,
            self::GAME_DEVELOPMENT,
            self::DATA_PARSING,
            self::SERVERS_HOSTING => CategoryEnum::DEVELOPING,

            // Дизайн и арт
            self::LOGO_BRANDING,
            self::UI_UX_DESIGN,
            self::CREATIVES,
            self::BANNERS_CARDS,
            self::AI_DESIGN,
            self::PHOTO_EDITING,
            self::_3D_MODELING_VISUALIZATION => CategoryEnum::DESIGN,

            // Видео и аудио
            self::AUDIO_RECORDING_VOICEOVER,
            self::VIDEO_EDITING,
            self::MOTION_DESIGN,
            self::_3D_ANIMATION,
            self::INTRO_ANIMATION => CategoryEnum::VIDEO,

            // SEO и трафик
            self::SEO_PROMOTION,
            self::SOCIAL_MEDIA_SMM,
            self::CONTEXT_ADS,
            self::DATABASES_CLIENTS,
            self::TARGETING,
            self::EMAIL_MARKETING => CategoryEnum::SEO,

            // Тексты и переводы
            self::TEXT_TRANSLATION,
            self::ARTICLE_POST_WRITING,
            self::EDITING_PROOFREADING,
            self::UI_UX_COPYWRITING,
            self::SOCIAL_MEDIA_POSTS,
            self::RESUME_VACANCY_WRITING => CategoryEnum::COPYWRITING,

            // Прочие услуги
            self::ACCOUNTING_TAXES,
            self::LEGAL_ASSISTANCE,
            self::CLIENT_MANAGEMENT_CRM,
            self::TABLE_WORK => CategoryEnum::OTHERS,
        };
    }
}
