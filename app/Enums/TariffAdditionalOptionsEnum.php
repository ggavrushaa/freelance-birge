<?php

namespace App\Enums;

enum TariffAdditionalOptionsEnum: string
{
    // DEVELOPING category options
    case INTEGRATION = 'integration';
    case DOCUMENTATION = 'documentation';
    case COMMENTS = 'comments';
    case TESTING = 'testing';
    case DEPLOYMENT = 'deployment';
    case EXPRESS = 'express';
    
    // DESIGN category options
    case SOURCE_CODE = 'source_code';
    case ANIMATION = 'animation';


    public function label(): string
    {
        return match ($this) {
            // DEVELOPING options
            self::INTEGRATION => 'Интеграция платежей',
            self::DOCUMENTATION => 'Написание документации к коду',
            self::COMMENTS => 'Добавить комментарии в коде',
            self::TESTING => 'Тестирование и багфиксинг',
            self::DEPLOYMENT => 'Установка проета на сервер',
            self::EXPRESS => 'Срочное выполнение (ускоренный срок)',
            
            // DESIGN options
            self::SOURCE_CODE => 'Исходный файл',
            self::ANIMATION => 'Анимация интерфейсов',
            // other options seeml to developing category
        };
    }

}