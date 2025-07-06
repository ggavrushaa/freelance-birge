<?php

namespace App\Enums;

enum CategoryEnum:string
{
    case DEVELOPING = 'developing';
    case DESIGN = 'design';
    case VIDEO = 'video';
    case SEO = 'seo';
    case COPYWRITING = 'copywriting';
    case OTHERS = 'others';

    public function label(): string
    {
        return match ($this) {
            self::DEVELOPING => 'Разработка и IT',
            self::DESIGN => 'Дизайн и арт',
            self::VIDEO => 'Видео и аудио',
            self::SEO => 'SEO и трафик',
            self::COPYWRITING => 'Тексты и переводы',
            self::OTHERS => 'Прочие услуги',
        };
    }
}
