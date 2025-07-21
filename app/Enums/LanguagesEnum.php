<?php

namespace App\Enums;

enum LanguagesEnum: string
{
    case RUSSIAN = 'ru';
    case ENGLISH = 'en';
    case GERMAN = 'de';
    case FRENCH = 'fr';
    case SPANISH = 'es';
    case ITALIAN = 'it';
    case PORTUGUESE = 'pt';
    case POLISH = 'pl';
    case UKRAINIAN = 'uk';
    case ROMANIAN = 'ro';
    case BULGARIAN = 'bg';
    case CROATIAN = 'hr';
    case SERBIAN = 'sr';
    case BOSNIAN = 'bs';
    case ALBANIAN = 'sq';
    case MACEDONIAN = 'mk';

    public function label(): string
    {
        return match ($this) {
            self::RUSSIAN => 'Русский',
            self::ENGLISH => 'Английский',
            self::GERMAN => 'Немецкий',
            self::FRENCH => 'Французский',
            self::SPANISH => 'Испанский',
            self::ITALIAN => 'Итальянский',
            self::PORTUGUESE => 'Португальский',
            self::POLISH => 'Польский',
            self::UKRAINIAN => 'Украинский',
            self::ROMANIAN => 'Румынский',
            self::BULGARIAN => 'Болгарский',
            self::CROATIAN => 'Хорватский',
            self::SERBIAN => 'Сербский',
            self::BOSNIAN => 'Боснийский',
            self::ALBANIAN => 'Албанский',
            self::MACEDONIAN => 'Македонский',
        };
    }
}
